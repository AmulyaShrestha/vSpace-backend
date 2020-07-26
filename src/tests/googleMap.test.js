// use the path of your model
const GoogleMap = require('../models/GoogleMap');
const mongoose = require('mongoose');
// use the new name of the database
const url = 'mongodb://localhost:27017/test-database';
beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('GoogleMap Schema save testing', () => {
    /**
     * Insert Testing --
     * **/
    it('GoogleMap addition testing', () => {
        const googleMap = {
            title: 'test Title',
            locationCoordinates: '85.3265, 69.23265'
        };

        return GoogleMap.create(googleMap)
            .then((pro_ret) => {
                expect(pro_ret.locationCoordinates).toEqual('85.3265, 69.23265');
            });
    });

    /**
     * Delete entire document within a collection Testing --
     * **/
    it('Delete google maps testing', async () => {
        const status = await GoogleMap.deleteMany();
        expect(status.ok).toBe(1);
    });
});
