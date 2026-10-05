import test from 'node:test'
import assert from 'node:assert/strict'
import { PLANS } from '../src/lib/plans.js'

test('existing plan names and monthly/annual prices are preserved', () => {
  assert.deepEqual(PLANS.map(({ name, monthly, annual }) => [name, monthly, annual]), [
    ['Basic', 15, 150], ['Plus', 25, 240], ['Premium', 40, 380], ['Ultimate', 60, 576],
  ])
})

test('comparison screen counts match plan entitlements', () => {
  for (const plan of PLANS) {
    assert.ok(plan.features.some(feature => feature.startsWith(`${plan.screens} simultaneous screen`)))
    assert.equal(plan.epg, plan.features.includes('EPG TV guide'))
    assert.equal(plan.catchup, plan.features.includes('Catch-up TV'))
    assert.equal(plan.highlighted, plan.id === 'premium')
  }
})

test('annual saving labels agree with total annual pricing', () => {
  for (const plan of PLANS) {
    const saving = Math.round((1 - plan.annual / (plan.monthly * 12)) * 100)
    assert.equal(plan.annualSave, `${saving}%`)
  }
})
