/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
// import { db } from "config/config";
import { db } from "config/config";

function useHandleCart() {
    //  const checkProductExists = (data, productInfo) => data.some((item) => item.id === productInfo.id);

    const handleAddToCart = (data, productInfo, type, action) => {
        const isProductExists = data.some((item) => item.id === productInfo.id);
        if (isProductExists) {
            const index = data.findIndex((item) => item.id === productInfo.id);
            const productQnt = data[index].qnt;
            const total = productInfo.qnt + productQnt;
            const updatedProduct = {
                ...data[index],
                qnt: action === "totalAdd" ? total : productQnt + 1

            };

            data[index] = updatedProduct;

            return data;
        }
        return data.concat({ ...productInfo, qnt: productInfo.qnt ?? 1 });
    };

    const handleRemoveCart = (uid, data, productInfo) => {
        const isProductExists = data.some((item) => item.id === productInfo.id);

        if (isProductExists) {
            const index = data.findIndex((item) => item.id === productInfo.id);
            const productQnt = data[index].qnt;
            if (productQnt === 1) {
                removeFromFirestore(uid, productInfo.id);
            } else {
                const updatedProduct = {
                    ...data[index],
                    qnt: productQnt - 1
                };
                data[index] = updatedProduct;
            }
            return data;
        }
        return { ...data };
    };

    const addToFireStore = (uid, product) => {
        db
            .collection("carts")
            .doc(uid)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    const { productInfo, type, action } = product || "";
                    const cartData = doc.data().cart;
                    product
                        && db
                            .collection("carts")
                            .doc(uid)
                            .set({
                                cart: type === "increase" ? handleAddToCart(cartData, productInfo, type, action)
                                    : handleRemoveCart(uid, cartData, productInfo, type)
                            });
                } else {
                    db
                        .collection("carts").doc(uid).set({
                            cart: []
                        });
                }
            })
            .catch((error) => {
                console.log("Fail:", error.message);
            });
    };
    const removeFromFirestore = (uid, id) => {
        db.collection("carts")
            .doc(uid)
            .get()
            .then((doc) => {
                const cartData = doc.data().cart;
                const index = cartData.findIndex(
                    (item) => item.id === id
                );
                cartData.splice(index, 1);

                id
                    && db.collection("carts").doc(uid).set({
                        cart: cartData
                    });
            })
            .catch((error) => {
                console.log("Fail to remove:", error.message);
            });
    };

    const removeAllFromFireStore = (uid) => {
        db.collection("carts")
            .doc(uid)
            .get()
            .then((doc) => {
                const cartData = doc.data().cart;
                cartData.length = 0;
                db.collection("carts")
                    .doc(uid)
                    .set({
                        cart: cartData
                    });
            });
    };

    return {
        addToFireStore, removeFromFirestore, removeAllFromFireStore
    };
}

export default useHandleCart;
