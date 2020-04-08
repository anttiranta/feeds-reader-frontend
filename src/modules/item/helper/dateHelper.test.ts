/// <reference types="jest" />

// App Imports
import {
    createIsoDateTimeFromDateAndTime,
    isoDateTimeToDateAndTime
} from './dateHelper';

test('Test createIsoDateTimeFromDateAndTime', () => {
    let isoDateTime = createIsoDateTimeFromDateAndTime('2020-04-07', '07:27:29', '+00:00')
    expect(isoDateTime).toBe('2020-04-07T07:27:29+00:00')

    isoDateTime = createIsoDateTimeFromDateAndTime('2004-09-12', '13:25:41', '+03:00')
    expect(isoDateTime).toBe('2004-09-12T13:25:41+03:00')

    isoDateTime = createIsoDateTimeFromDateAndTime('2004-09-12', '11:09:21', '-04:00')
    expect(isoDateTime).toBe('2004-09-12T11:09:21-04:00')
})

test('Test creating ISO datetime with invalid time parts', () => {
    expect(() => {
        createIsoDateTimeFromDateAndTime('2020-04', '12:07:29', '00:00');
    }).toThrow();

    expect(() => {
        createIsoDateTimeFromDateAndTime('2004-09-12', '25:41', '03:00')
    }).toThrow();
    
    expect(() => {
        createIsoDateTimeFromDateAndTime('2004-09-12', '13:25:41', '00')
    }).toThrow();

    expect(() => {
        createIsoDateTimeFromDateAndTime('2020-04-F1', '12:0A:29', '04:00');
    }).toThrow();

    expect(() => {
        createIsoDateTimeFromDateAndTime('vvvv-kk-01', '01.--', '00:00');
    }).toThrow();
})

test('Test isoDateTimeToDateAndTime', () => {
    let parts = isoDateTimeToDateAndTime('2020-04-07T07:27:29+00:00')

    expect(parts.length).toBe(3)
    expect(parts[0]).toBe('2020-04-07')
    expect(parts[1]).toBe('07:27:29')
    expect(parts[2]).toBe('+00:00')

    parts = isoDateTimeToDateAndTime('2004-09-12T13:25:41-03:00')
    
    expect(parts.length).toBe(3)
    expect(parts[0]).toBe('2004-09-12')
    expect(parts[1]).toBe('13:25:41')
    expect(parts[2]).toBe('-03:00')
})

test('Test splitting ISO datetime with invalid datetime', () => {
    expect(() => {
        isoDateTimeToDateAndTime('2020-04T07:27:29+00:00');
    }).toThrow();

    expect(() => {
        isoDateTimeToDateAndTime('2004-09-12T25:41+03:00')
    }).toThrow();
    
    expect(() => {
        isoDateTimeToDateAndTime('2004-09-12T13:25:41+00')
    }).toThrow();

    expect(() => {
        isoDateTimeToDateAndTime('2020-04-F1T12:0A:29+04:00');
    }).toThrow();

    expect(() => {
        isoDateTimeToDateAndTime('2020-04-07T07:27:29/00:00');
    }).toThrow();
})