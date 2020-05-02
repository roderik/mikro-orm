import { MetadataStorage } from '../metadata';
import { EntityRepository } from '../entity';
import { Utils } from '../utils';
import { AnyEntity, Constructor, Dictionary } from '../typings';

export function Entity(options: EntityOptions<any> = {}): Function {
  return function <T extends { new(...args: any[]): AnyEntity<T> }>(target: T) {
    const meta = MetadataStorage.getMetadataFromDecorator(target);
    Utils.merge(meta, options);
    meta.class = target;
    meta.name = target.name;

    return target;
  };
}

export type EntityOptions<T extends AnyEntity<T>> = {
  tableName?: string;
  collection?: string;
  discriminatorColumn?: string;
  discriminatorMap?: Dictionary<string>;
  discriminatorValue?: string;
  customRepository?: () => Constructor<EntityRepository<T>>;
};