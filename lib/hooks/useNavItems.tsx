import { useRouter } from 'next/router';
import type { Route } from 'nextjs-routes';
import React from 'react';

import appConfig from 'configs/app/config';
import abiIcon from 'icons/ABI.svg';
import apiKeysIcon from 'icons/API.svg';
import appsIcon from 'icons/apps.svg';
import blocksIcon from 'icons/block.svg';
// import gearIcon from 'icons/gear.svg';
import privateTagIcon from 'icons/privattags.svg';
import profileIcon from 'icons/profile.svg';
import publicTagIcon from 'icons/publictags.svg';
import statsIcon from 'icons/stats.svg';
import tokensIcon from 'icons/token.svg';
import transactionsIcon from 'icons/transactions.svg';
import walletIcon from 'icons/wallet.svg';
import watchlistIcon from 'icons/watchlist.svg';
import notEmpty from 'lib/notEmpty';

export interface NavItem {
  text: string;
  nextRoute: Route;
  icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  isActive?: boolean;
  isNewUi?: boolean;
}

interface ReturnType {
  mainNavItems: Array<NavItem>;
  accountNavItems: Array<NavItem>;
  profileItem: NavItem;
}

export default function useNavItems(): ReturnType {
  const isMarketplaceFilled = appConfig.marketplaceAppList.length > 0;

  const router = useRouter();
  const pathname = router.pathname;

  return React.useMemo(() => {
    const mainNavItems = [
      { text: 'Blocks', nextRoute: { pathname: '/blocks' as const }, icon: blocksIcon, isActive: pathname.startsWith('/block'), isNewUi: true },
      { text: 'Transactions', nextRoute: { pathname: '/txs' as const }, icon: transactionsIcon, isActive: pathname.startsWith('/tx'), isNewUi: true },
      { text: 'Tokens', nextRoute: { pathname: '/tokens' as const }, icon: tokensIcon, isActive: pathname.startsWith('/token'), isNewUi: true },
      { text: 'Accounts', nextRoute: { pathname: '/accounts' as const }, icon: walletIcon, isActive: pathname === '/accounts', isNewUi: true },
      isMarketplaceFilled ?
        { text: 'Apps', nextRoute: { pathname: '/apps' as const }, icon: appsIcon, isActive: pathname.startsWith('/app'), isNewUi: true } : null,
      { text: 'Charts & stats', nextRoute: { pathname: '/stats' as const }, icon: statsIcon, isActive: pathname === '/stats', isNewUi: true },
      // there should be custom site sections like Stats, Faucet, More, etc but never an 'other'
      // examples https://explorer-edgenet.polygon.technology/ and https://explorer.celo.org/
      // at this stage custom menu items is under development, we will implement it later
      // { text: 'Other', url: link('other'), icon: gearIcon, isActive: pathname === 'other' },
    ].filter(notEmpty);

    const accountNavItems = [
      {
        text: 'Watchlist',
        nextRoute: { pathname: '/account/watchlist' as const },
        icon: watchlistIcon,
        isActive: pathname === '/account/watchlist',
        isNewUi: true,
      },
      {
        text: 'Private tags',
        nextRoute: { pathname: '/account/tag_address' as const },
        icon: privateTagIcon,
        isActive: pathname === '/account/tag_address',
        isNewUi: true,
      },
      {
        text: 'Public tags',
        nextRoute: { pathname: '/account/public_tags_request' as const },
        icon: publicTagIcon, isActive: pathname === '/account/public_tags_request', isNewUi: true,
      },
      { text: 'API keys', nextRoute: { pathname: '/account/api_key' as const }, icon: apiKeysIcon, isActive: pathname === '/account/api_key', isNewUi: true },
      {
        text: 'Custom ABI',
        nextRoute: { pathname: '/account/custom_abi' as const },
        icon: abiIcon,
        isActive: pathname === '/account/custom_abi',
        isNewUi: true,
      },
    ];

    const profileItem = {
      text: 'My profile', nextRoute: { pathname: '/auth/profile' as const }, icon: profileIcon, isActive: pathname === '/auth/profile', isNewUi: true };

    return { mainNavItems, accountNavItems, profileItem };
  }, [ isMarketplaceFilled, pathname ]);
}
