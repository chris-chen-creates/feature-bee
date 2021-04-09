import { Connection } from 'mysql2';

import Config from '../config';
import FeatureController from '../controller';
import FeatureDAO from '../model';

const config = Config.readFromEnvironment();
const db = mysql.createConnection(config.dbOptions());

test('create feature works properly', async () => {
  const featureController = new FeatureController(new FeatureDAO(db));
  await featureController.createFeature({
    name: 'test',
    active: false,
  });
  expect(await featureController.listFeatures()).toEqual([{
    id: 1,
    name: 'test',
    active: false,
  }]);
});
