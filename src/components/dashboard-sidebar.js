import { Fragment, useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
import { Cog as CogIcon } from '../icons/cog';
import { Lock as LockIcon } from '../icons/lock';
import { Selector as SelectorIcon } from '../icons/selector';
import { ShoppingBag as ShoppingBagIcon } from '../icons/shopping-bag';
import { User as UserIcon } from '../icons/user';
import { UserAdd as UserAddIcon } from '../icons/user-add';
import { Users as UsersIcon } from '../icons/users';
import { XCircle as XCircleIcon } from '../icons/x-circle';
import { Logo } from './logo';
import { NavItem } from './nav-item';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import InventoryIcon from '@mui/icons-material/Inventory';
import LogoutIcon from '@mui/icons-material/Logout';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

const LocalStorage = require('local-storage');

const items = [
  {
    href: '/',
    icon: (<PointOfSaleIcon fontSize="small" />),
    title: 'Kasir'
  },
  {
    href: '/customers',
    icon: (<LocalAtmIcon fontSize="small" />),
    title: 'Penjualan'
  },
  {
    href: '/products',
    icon: (<InventoryIcon fontSize="small" />),
    title: 'Stok'
  },
  {
    href: '/account',
    icon: (<UserIcon fontSize="small" />),
    title: 'Akun'
  }
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const level = 2 // 0 = user, 1 = admin, 2 = super admin
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
          <Box sx={{ p: 1 }}>
            <Typography className="text-center" variant="h5">
              Pewe Food
            </Typography>
          </Box>
        </div>

        <div className='text-center mt-2'>
          <Typography className="text-muted text-center" variant="caption">Menu</Typography>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
          }}
        />
        <Box className="mt-2" sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}

          {
            level === 2 ? (
              <Fragment>
                <div className='text-center'>
                  <Typography className="text-muted text-center" variant="caption">Super Admin Menu</Typography>
                </div>
                <Divider
                  sx={{
                    borderColor: '#2D3748',
                  }}
                />
                <NavItem
                  key={'Logout'}
                  icon={(<SupervisedUserCircleIcon fontSize="small" />)}
                  title={'Daftar Pengguna'}
                  href="/pengguna"
                />
                <Divider
                  sx={{
                    borderColor: '#2D3748',
                  }}
                />
              </Fragment>
            ) : null
          }

          <NavItem
            key={'Logout'}
            icon={(<LogoutIcon fontSize="small" />)}
            title={'Logout'}
            onClick={() => {
              LocalStorage.remove('token')

            }}
            href="/#"
          />
        </Box>
        <Divider sx={{ borderColor: '#2D3748' }} />
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
