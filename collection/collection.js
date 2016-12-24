
userConversation=new Mongo.Collection("userChat");
userConversation.allow({
    insert() {
        return false;
        // When we will not ALLOW inserts on the client.
    },
    update() {
        return false;
        // When we will not ALLOW updates on the client.
    },
    remove() {
        return false;
        // When we will not ALLOW remove on the client.
    }
});