import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
    celsiusToFahrenheit,
    fahrenheitToCelsius,
    formatData,
    formatTime,
} from '../src/js/utils.js';

describe('celsiusToFahrenheit', () => {
    it('converts 0 °C to 32 °F', () => assert.equal(celsiusToFahrenheit(0), 32));
    it('converts 100 °C to 212 °F', () => assert.equal(celsiusToFahrenheit(100), 212));
    it('converts -40 °C to -40 °F', () => assert.equal(celsiusToFahrenheit(-40), -40));
});

describe('fahrenheitToCelsius', () => {
    it('converts 32 °F to 0 °C', () => assert.equal(fahrenheitToCelsius(32), 0));
    it('converts 212 °F to 100 °C', () => assert.equal(fahrenheitToCelsius(212), 100));
    it('converts -40 °F to -40 °C', () => assert.equal(fahrenheitToCelsius(-40), -40));
});

describe('celsiusToFahrenheit / fahrenheitToCelsius round-trip', () => {
    it('round-trips 25 °C', () =>
        assert.ok(Math.abs(fahrenheitToCelsius(celsiusToFahrenheit(25)) - 25) < 0.0001));
});

describe('formatData', () => {
    it('pretty-prints an object as JSON', () =>
        assert.equal(formatData({ a: 1 }), '{\n  "a": 1\n}'));
    it('handles arrays', () =>
        assert.equal(formatData([1, 2]), '[\n  1,\n  2\n]'));
});

describe('formatTime', () => {
    it('returns a YYYY-MM-DD HH:MM:SS string', () => {
        const date = new Date('2026-03-01T12:00:00.000Z');
        assert.match(formatTime(date), /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
    });
});
