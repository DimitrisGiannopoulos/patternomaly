import { assert, expect } from 'chai';
import * as jsdom from 'jsdom';
import * as pattern from '../src/patterns.js';

global.document = jsdom.jsdom('<html></html>');

const COLORS = [
  '#1f77b4',
  '#e377c2',
  '#ff7f0e',
  '#2ca02c',
  '#bcbd22',
  '#d62728',
  '#17becf',
  '#9467bd',
  '#7f7f7f',
  '#8c564b'
];

function generateColors (total) {
  let colorsList = COLORS.slice(0);
  let colorsTotal = total / COLORS.length;

  for (let i = 1; i < colorsTotal; i++) {
    Array.prototype.push.apply(colorsList, COLORS);
  }

  return colorsList;
}

describe('pattern', () => {

  describe('draw', () => {
    it('should return a canvas element', () => {
      const testPattern = pattern.draw();

      expect(testPattern.toString()).to.equal('[object CanvasPattern]');
    });
  });

  describe('generate', () => {
    it('should return a list of canvas patterns', function () {
      const colorList = [
        '#ff6384',
        '#36a2eb'
      ];
      let testPatterns;

      testPatterns = pattern.generate(colorList);

      assert(Array.isArray(testPatterns));
      expect(testPatterns.length).to.equal(2);
      expect(testPatterns[0].toString()).to.equal('[object CanvasPattern]');
      expect(testPatterns[1].toString()).to.equal('[object CanvasPattern]');
    });

    it('should NOT return a list that includes deprecated patterns', function () {
      const deprecatedShapes = [
        'circle',
        'triangle-inverted',
        'line-horizontal',
        'line-diagonal-lr',
        'line-diagonal-rl',
        'zigzag-horizontal'
      ];
      let containsDeprecatedShapes = false;
      let colorsList;
      let testPatterns;

      colorsList = generateColors(100);

      testPatterns = pattern.generate(colorsList);

      containsDeprecatedShapes = testPatterns.some(pattern => {
        deprecatedShapes.indexOf(pattern.shapeType) >= 0;
      });

      assert.isNotOk(containsDeprecatedShapes);
    });

    //   // TODO there is no guanrantee this test will fail even when it should
    //   // this requires mocking the available shape list. Try again using ES2015
    //   // for tests perhaps switching to Mocha
    // test('a pattern type should not be contiguous', function(t) {
    //   t.plan(1);
    //
    //   var colorsList = generateColors(100);
    //   var testPatterns = pattern.generate(colorsList);
    //   var hasContiguousPatterns = false;
    //
    //   hasContiguousPatterns = testPatterns.some(function (pattern, index) {
    //     if (index === 0) {
    //       return testPatterns[testPatterns.length-1].shapeType === pattern.shapeType;
    //     } else {
    //       return testPatterns[index-1].shapeType === pattern.shapeType;
    //     }
    //   });
    //
    //   t.notOk(hasContiguousPatterns);
    // });
  });
});
