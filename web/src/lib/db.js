import { ObjectId } from 'mongodb';

// IN-MEMORY DATABASE MOCK
const store = {
    users: [],
    products: [
        {
            _id: new ObjectId(),
            title: "Bamboo Toothbrush",
            description: "100% biodegradable and eco-friendly bamboo toothbrush.",
            category: "Personal Care",
            price: 6.99,
            owner_email: "demo@ecofinds.com"
        },
        {
            _id: new ObjectId(),
            title: "Reusable Tote Bag",
            description: "Organic cotton canvas grocery bag.",
            category: "Home",
            price: 15.50,
            owner_email: "demo@ecofinds.com"
        },
        {
            _id: new ObjectId(),
            title: "Recycled Glass Vase",
            description: "Hand-blown beautiful vase made from recycled bottles.",
            category: "Home",
            price: 34.00,
            owner_email: "demo@ecofinds.com"
        }
    ],
    carts: [],
    purchases: []
};

class Collection {
    constructor(name) {
        this.name = name;
        if (!store[name]) store[name] = [];
    }

    find(query = {}) {
        const listName = this.name;
        // Cursor mock that correctly chains operations
        const cursor = {
            sort: () => cursor,
            toArray: async () => {
                let res = store[listName];
                if (query.user_email) res = res.filter(i => i.user_email === query.user_email);
                if (query.owner_email) res = res.filter(i => i.owner_email === query.owner_email);
                // Mock sorting by newest
                return [...res].reverse();
            }
        };
        return cursor;
    }

    async findOne(query) {
        const list = store[this.name];
        if (query.email) return list.find(i => i.email === query.email) || null;
        if (query._id) return list.find(i => i._id.toString() === query._id.toString()) || null;
        return list[0] || null;
    }

    async insertOne(doc) {
        if (!doc._id) doc._id = new ObjectId();
        store[this.name].push(doc);
        return { insertedId: doc._id };
    }

    async deleteOne(query) {
        const list = store[this.name];
        if (query._id) {
            const index = list.findIndex(i => i._id.toString() === query._id.toString());
            if (index > -1) {
                list.splice(index, 1);
            }
        }
        return { deletedCount: 1 };
    }

    async deleteMany(query) {
        if (query.user_email) {
            store[this.name] = store[this.name].filter(i => i.user_email !== query.user_email);
        }
    }
}

export async function getDb() {
    return {
        collection: (name) => new Collection(name)
    };
}
