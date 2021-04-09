import { Connection } from 'mysql2';

import FeatureController from '../controller';
import FeatureDAO from '../model';

test('create feature works properly', async () => {
  const featureController = new FeatureController(new FeatureDAO(litedb));
  await featureController.createFeature({
    name: 'test',
    active: false,
  });
  expect(await featureController.listFeatures()).toEqual([{

  }]);
});
