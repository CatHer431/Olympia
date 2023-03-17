import React from 'react';
import { SelectField } from '../../../common/Fields';

const roomsSortArray = [
  { name: 'Descending', value: { path: 'roomNumber', order: 'desc' } },
  { name: 'Ascending', value: { path: 'roomNumber', order: 'asc' } },
  { name: 'Popular', value: { path: 'countReviews', order: 'desc' } },
  { name: 'High rating', value: { path: 'rate', order: 'desc' } },
  { name: 'Cheap first', value: { path: 'price', order: 'asc' } },
  { name: 'Dear ones first', value: { path: 'price', order: 'desc' } },
];

type RoomsSortProps = {
  sortBy: { path: string; order: 'asc' | 'desc' };
  onSort: (event: any) => void;
};

const RoomsSort: React.FC<RoomsSortProps> = ({ sortBy, onSort }) => {
  return (
    <SelectField
      name='roomSort'
      style={{ minWidth: '200px' }}
      label='Sort by'
      value={JSON.stringify(sortBy)}
      onChange={onSort}
      options={roomsSortArray}
    />
  );
};

export default RoomsSort;
