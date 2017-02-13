import { getCollectedFeeds } from "./../../src/collection/CollectionFeedsRequestHandler";
import CouchClient from "../../src/CouchClient";
import sinon from "sinon";
import { assert } from "chai";

describe("CollectionFeedsRequestHandler", () => {

    describe("getCollectedFeeds", () => {
        let sandbox = null, authSession = null, couchClient = null, selector = null;
        let offset = 0, collection = "test";

        beforeEach("getCollectedFeeds", () => {
            sandbox = sinon.sandbox.create();
            selector = {
                "selector": {
                    "docType": {
                        "$eq": "collectionFeed"
                    },
                    "collection": {
                        "$eq": collection
                    }
                },
                "skip": offset
            };
            authSession = "test_session";
            couchClient = new CouchClient();
            sandbox.stub(CouchClient, "instance").returns(couchClient);
        });

        afterEach("getCollectedFeeds", () => {
            sandbox.restore();
        });

        it("should get Collection Feeds from the database", async () => {
            let feedIDs = {
                "docs": [
                    {
                        "_id": "id",
                        "docType": "collectionFeed",
                        "feedId": "feedId",
                        "collection": collection
                    },
                    {
                        "_id": "id2",
                        "docType": "collectionFeed",
                        "feedId": "feedId2",
                        "collection": collection
                    }
                ]
            };

            let feeds = [
                {
                    "_id": "id",
                    "title": "title",
                    "description": "description"
                },
                {
                    "_id": "id2",
                    "title": "title2",
                    "description": "description2"
                }
            ];

            let findDocumentsMock = sandbox.mock(couchClient).expects("findDocuments");
            findDocumentsMock.withArgs(selector).returns(Promise.resolve(feedIDs));

            let getDocsMock = sandbox.mock(couchClient);

            let getFirstFeedMock = getDocsMock.expects("getDocument").withArgs("feedId").returns(Promise.resolve({
                "_id": "id",
                "title": "title",
                "description": "description"
            }));

            let getSecondFeedMock = getDocsMock.expects("getDocument").withArgs("feedId2").returns(Promise.resolve({
                "_id": "id2",
                "title": "title2",
                "description": "description2"
            }));

            let docs = await getCollectedFeeds(authSession, collection, offset);
            assert.deepEqual(docs, feeds);
            findDocumentsMock.verify();
            getFirstFeedMock.verify();
            getSecondFeedMock.verify();
        });

        it("should get Collection Feeds from the database when one of the promise is rejected", async () => {
            let feedIDs = {
                "docs": [
                    {
                        "_id": "id",
                        "docType": "collectionFeed",
                        "feedId": "feedId",
                        "collection": collection
                    },
                    {
                        "_id": "id2",
                        "docType": "collectionFeed",
                        "feedId": "feedId2",
                        "collection": collection
                    }
                ]
            };

            let feeds = [
                {
                    "_id": "id",
                    "title": "title",
                    "description": "description"
                }
            ];

            let findDocumentsMock = sandbox.mock(couchClient).expects("findDocuments");
            findDocumentsMock.withArgs(selector).returns(Promise.resolve(feedIDs));

            let getDocsMock = sandbox.mock(couchClient);

            let getFirstFeedMock = getDocsMock.expects("getDocument").withArgs("feedId").returns(Promise.resolve({
                "_id": "id",
                "title": "title",
                "description": "description"
            }));

            let getSecondFeedMock = getDocsMock.expects("getDocument").withArgs("feedId2").returns(Promise.reject({
                "_id": "id2",
                "title": "title2",
                "description": "description2"
            }));

            let docs = await getCollectedFeeds(authSession, collection, offset);
            assert.deepEqual(docs, feeds);
            findDocumentsMock.verify();
            getFirstFeedMock.verify();
            getSecondFeedMock.verify();
        });

        it("should reject with error when database throws unexpected response while getting feedIds", async () => {
            let findDocumentsMock = sandbox.mock(couchClient).expects("findDocuments");
            findDocumentsMock.withArgs(selector).returns(Promise.reject("unexpected response from the db"));
            try{
                await getCollectedFeeds(authSession, collection, offset);
                findDocumentsMock.verify();
            } catch(error) {
                assert.strictEqual(error, "unexpected response from the db");
            }
        });
    });
});