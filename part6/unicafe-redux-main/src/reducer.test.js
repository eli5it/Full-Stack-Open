import deepFreeze from 'deep-freeze';
import counterReducer from './reducer';

describe('unicafe reducer', () => {
  const initialState = {
    good: 1,
    ok: 1,
    bad: 1,
  };

  test('should return a proper initial state when called with undefined state', () => {
    const state = {};
    const action = {
      type: 'DO_NOTHING',
    };

    const newState = counterReducer(undefined, action);
    expect(newState).toEqual({
      good: 0,
      bad: 0,
      ok: 0,
    });
  });

  test('good is incremented', () => {
    const action = {
      type: 'GOOD',
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 2,
      ok: 1,
      bad: 1,
    });
  });
  test('bad is incremented', () => {
    const action = {
      type: 'BAD',
    };
    const state = initialState;

    deepFreeze(state);

    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 1,
      bad: 2,
      ok: 1,
    });
  });
  test('ok is incremented', () => {
    const action = {
      type: 'OK',
    };
    const state = initialState;

    deepFreeze(state);

    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 1,
      bad: 1,
      ok: 2,
    });
  });
  test('zero is implemented', () => {
    const action = {
      type: 'ZERO',
    };
    const state = initialState;

    deepFreeze(state);

    const newState = counterReducer(state, action);
    console.log('new state is', newState);
    expect(newState).toEqual({
      good: 0,
      bad: 0,
      ok: 0,
    });
  });
});
