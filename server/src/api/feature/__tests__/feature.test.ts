import mysql from 'mysql2'

import Config from '../../../config'
import FeatureController from '../controller'
import FeatureDAO from '../model'

const config = Config.readFromEnvironment()
const db = mysql.createConnection(config.dbOptions())
const controller = new FeatureController(new FeatureDAO(db))

test('create feature works as intended', async () => {
  const featureId = await controller.createFeature({
    name: 'test',
    active: false,
  })

  const features = await controller.listFeatures()
  expect(features).toEqual([
    {
      id: featureId,
      name: 'test',
      active: 0, // booleans get converted to integers
    },
  ])
})

test('update feature works as intended', async () => {
  const featureId = await controller.createFeature({
    name: 'test-update',
    active: false,
  })

  await controller.updateFeature({
    id: featureId,
    active: true,
  })

  const feature = await controller.getFeature(featureId)
  expect(feature).toEqual({
    id: featureId,
    name: 'test-update',
    deleted_at: null,
    active: 1,
  })
})

test('delete feature works as intended', async () => {
  const featureId = await controller.createFeature({
    name: 'test-delete',
    active: false,
  })

  await controller.deleteFeature({
    id: featureId,
  })

  const feature = await controller.getFeature(featureId)
  expect(feature.deleted_at).toBeDefined()
})

test('list features works as intended', async () => {
  const featureId = await controller.createFeature({
    name: 'test-list',
    active: false,
  })

  await controller.deleteFeature({
    id: featureId,
  })

  const feature = await controller.listFeatures()
  expect(feature).toEqual([
    {
      id: 1,
      name: 'test',
      active: 0,
    },
    {
      id: 2,
      name: 'test-update',
      active: 1,
    },
  ])
})

test('list features combined with delete works as intended', async () => {
  const featureId = await controller.createFeature({
    name: 'combo-breaker-list',
    active: false,
  })

  await controller.deleteFeature({
    id: featureId,
  })

  await controller.deleteFeature({
    id: 1,
  })

  const feature = await controller.listFeatures()
  const names = feature.map((feature: { name: any }) => feature.name)
  expect(names.includes('combo-breaker-list')).toBeFalsy()
})

test('trying to see if a chain of commands breaks', async () => {
  const featureId = await controller.createFeature({
    name: 'big-bad-feature',
    active: false,
  })

  await controller.deleteFeature({
    id: featureId,
  })

  await controller.deleteFeature({
    id: 1,
  })

  const feature = await controller.getFeature(2)
  expect(feature).toEqual({
    id: 2,
    name: 'test-update',
    deleted_at: null,
    active: 1,
  })
})

afterAll(() => {
  db.end()
})
