import { chakra } from '@chakra-ui/react';
import _omit from 'lodash/omit';
import React from 'react';

import { route } from 'nextjs-routes';

import * as EntityBase from 'ui/shared/entities/base/components';

type LinkProps = EntityBase.LinkBaseProps & Pick<EntityProps, 'hash' | 'shard'>;

const Link = chakra((props: LinkProps) => {
  const queryParams: {hash: string; shard?: string} = { hash: props.hash };
  if (props.shard) {
    queryParams.shard = props.shard;
  }
  const defaultHref = route({ pathname: '/staking-tx/[hash]', query: queryParams });

  return (
    <EntityBase.Link
      { ...props }
      href={ props.href ?? defaultHref }
    >
      { props.children }
    </EntityBase.Link>
  );
});

type IconProps = Omit<EntityBase.IconBaseProps, 'name'> & {
  name?: EntityBase.IconBaseProps['name'];
};

const Icon = (props: IconProps) => {
  return (
    <EntityBase.Icon
      { ...props }
      name={ props.name ?? 'transactions_slim' }
    />
  );
};

type ContentProps = Omit<EntityBase.ContentBaseProps, 'text'> & Pick<EntityProps, 'hash' | 'text'>;

const Content = chakra((props: ContentProps) => {
  return (
    <EntityBase.Content
      { ...props }
      text={ props.text ?? props.hash }
    />
  );
});

type CopyProps = Omit<EntityBase.CopyBaseProps, 'text'> & Pick<EntityProps, 'hash'>;

const Copy = (props: CopyProps) => {
  return (
    <EntityBase.Copy
      { ...props }
      text={ props.hash }
      // by default we don't show copy icon, maybe this should be revised
      noCopy={ props.noCopy ?? true }
    />
  );
};

const Container = EntityBase.Container;

export interface EntityProps extends EntityBase.EntityBaseProps {
  hash: string;
  shard?: string;
  text?: string;
}

const StakingTxEntity = (props: EntityProps) => {
  const linkProps = _omit(props, [ 'className' ]);
  const partsProps = _omit(props, [ 'className', 'onClick' ]);

  return (
    <Container className={ props.className }>
      <Icon { ...partsProps }/>
      <Link { ...linkProps }>
        <Content { ...partsProps }/>
      </Link>
      <Copy { ...partsProps }/>
    </Container>
  );
};

export default React.memo(chakra(StakingTxEntity));

export {
  Container,
  Link,
  Icon,
  Content,
  Copy,
};