import mysql from 'mysql2';

import Config from '../../../config';
import FeatureController from '../controller';
import FeatureDAO from '../model';

const config = Config.readFromEnvironment();
const db = mysql.createConnection(config.dbOptions());
const controller = new FeatureController(new FeatureDAO(db));

test('create feature works', async () => {
  const featureId = await controller.createFeature({
    name: 'test',
    active: false,
  });

  const features = await controller.listFeatures();
  expect(features).toEqual([{
    id: featureId,
    name: 'test',
    active: 0, // booleans get converted to integers
  }]);
});

afterAll(() => {
  db.end();
});
