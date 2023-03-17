import { Breadcrumbs as MuiBreadcrumbs, Link } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import withBreadcrumbs, { BreadcrumbsRoute } from 'react-router-breadcrumbs-hoc';
import { Link as RouterLink, LinkProps, Route, RouteComponentProps } from 'react-router-dom';
import { getRoomById } from '../../../store/rooms';
import { getUserById } from '../../../store/users';

type RouteParams = {
  userId: string;
  roomId: string;
  route: string;
};

const UserBreadcrumb: React.FC<RouteComponentProps<RouteParams>> = props => {
  const user = useSelector(getUserById(props.match.params.userId));
  if (user) {
    return <span>{`${user?.firstName} ${user?.secondName}`}</span>;
  }
  return <span>User is not found</span>;
};

const RoomBreadcrumb: React.FC<RouteComponentProps<RouteParams>> = props => {
  const room = useSelector(getRoomById(props.match.params.roomId));
  return <span>Roon number №{room?.roomNumber}</span>;
};

const UserRouteBreadcrumb: React.FC<RouteComponentProps<RouteParams>> = props => {
  const route = props.match.params.route;

  let breadcrumbText;
  switch (route) {
    case 'booking':
      breadcrumbText = 'My bookings';
      break;
    case 'dashboard':
      breadcrumbText = 'Admin panel';
      break;
    case 'likes':
      breadcrumbText = 'Likes';
      break;
    case 'favorites':
      breadcrumbText = 'Favorites';
      break;
    case 'edit':
      breadcrumbText = 'Edit profile';
      break;

    default:
      breadcrumbText = '';
      break;
  }
  return <span>{breadcrumbText}</span>;
};

const routeConfig = [
  {
    path: '/',
    breadcrumb: 'Home',
  },
  {
    path: '/rooms',
    breadcrumb: 'Available rooms',
  },
  {
    path: '/rooms/:roomId?',
    breadcrumb: RoomBreadcrumb,
  },
  {
    path: '/profile',
    breadcrumb: 'Profile',
  },
  {
    path: '/profile/:userId?',
    breadcrumb: UserBreadcrumb,
  },
  {
    path: '/profile/:userId?/:route?',
    breadcrumb: UserRouteBreadcrumb,
  },
];

const LinkRouter = (props: LinkProps) => (
  <Link {...props} className='breadcrumbs-item' underline='hover' component={RouterLink} />
);

type BreadcrumbsPropsType = {
  breadcrumbs: any;
};

const Breadcrumbs: React.FC<BreadcrumbsPropsType> = ({ breadcrumbs }) => {
  return (
    <div className='breadcrumbs'>
      <Route>
        {() => {
          return (
            <MuiBreadcrumbs aria-label='breadcrumb'>
              {breadcrumbs.map(({ match, breadcrumb }: BreadcrumbsRoute, index: number) => {
                const last = index === breadcrumbs.length - 1;
                return last ? (
                  <span className='breadcrumbs-item--last' key={match.url}>
                    {breadcrumb}
                  </span>
                ) : (
                  <span key={match.url}>
                    <LinkRouter key={match.url} to={match.url}>
                      {breadcrumb}
                    </LinkRouter>
                  </span>
                );
              })}
            </MuiBreadcrumbs>
          );
        }}
      </Route>
    </div>
  );
};

export default withBreadcrumbs(routeConfig)(Breadcrumbs);
