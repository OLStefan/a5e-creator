/* Based on https://www.npmjs.com/package/postcss-plugin-namespace */
var postcss = require('postcss');

module.exports = postcss.plugin('postcss-plugin-namespace-wrapper', function () {
	const ignore = [
		/:where\(\.css-dev-only-do-not-override-.*\)/,
		/^\.ant/,
		'.data-ant-cssinjs-cache-path',
		'*',
		'html',
		'body',
	];
	const prefix = ':not(:global(#a5e))';

	return function (root) {
		if (!prefix || typeof prefix !== 'string') {
			return;
		}

		root.walkRules(function (rule) {
			if (!rule.selectors) {
				return rule;
			}

			if (specailTest(rule)) {
				return rule;
			}

			rule.selectors = rule.selectors.map(function (selector, index) {
				if (classMatchesTest(selector, ignore) || selector.trim().length === 0) {
					return selector;
				}
				if (rule.parent.selector?.startsWith(prefix)) {
					return selector;
				}
				return prefix.trim() + ' ' + selector;
			});
			return rule;
		});
	};
});

/**
 * Determine if class passes test
 *
 * @param {string} clss selector
 * @param {string} test reg or string
 * @return {boolean} if class selector
 */
function classMatchesTest(clss, test) {
	if (!test) {
		return false;
	}

	clss = clss.trim();

	if (test instanceof RegExp) {
		return test.exec(clss);
	}

	if (Array.isArray(test)) {
		var tests = test;

		return tests.some(function (testItem) {
			if (testItem instanceof RegExp) {
				return testItem.exec(clss);
			} else {
				return clss === testItem;
			}
		});
	}

	return clss === test;
}

/**
 * Determine if the selector couldn't be added namespace
 *
 * @param {object} rule css rule
 * @return {boolean} if the selector couldn't be added namespace
 */
function specailTest(rule) {
	if (rule.parent && rule.parent.name && rule.parent.name.indexOf('keyframes') > -1) {
		return true;
	}
	return false;
}
