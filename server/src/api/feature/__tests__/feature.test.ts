import mysql from 'mysql2';

import Config from '../../../config';
import FeatureController from '../controller';
import FeatureDAO from '../model';

describe('feature integration tests', async () => {
  const config = Config.readFromEnvironment();
  const db = mysql.createConnection(config.dbOptions());
  const controller = new FeatureController(new FeatureDAO(db));

  test('create feature works', async () => {

    await controller.createFeature({
      name: 'test',
      active: false,
    });

    const features = await controller.listFeatures();
    expect(features).toEqual([{
      id: 1,
      name: 'test',
      active: 0, // booleans get converted to integers
    }]);
  });

  afterAll(() => {
    db.end();
  });
});
