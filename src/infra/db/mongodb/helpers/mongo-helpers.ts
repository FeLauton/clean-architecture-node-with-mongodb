import { MongoClient, Collection } from "mongodb";

export const MongoHelper = {
  client: null as MongoClient,
  async connect(uri: string): Promise<void> {
    await this.client.connect(uri);
  },

  async disconnect() {
    await this.client.close();
  },

  getCollection(name: string): Collection {
    return this.client.getCollection(name);
  },

  mongoMap<T>(collection: any): T {
    const { _id, ...collectionWithoutIds } = collection[0];
    return Object.assign({}, collectionWithoutIds, { id: _id });
  },
};
