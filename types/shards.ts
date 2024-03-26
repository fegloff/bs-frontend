import type { ResourceName, ResourcePayload } from 'lib/api/resources';

export type ShardId = string;
export type ShardInfo = {
  id: ShardId;
  title: string;
  apiHost: string;
};

export type ShardableResponse = Record<string, {
  data?: ResourcePayload<ResourceName>;
}>;