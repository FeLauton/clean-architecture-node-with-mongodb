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
};
