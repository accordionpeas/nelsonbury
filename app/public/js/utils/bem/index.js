import classNames from 'classnames';
import * as R from 'ramda';

const getBase = ({ block, element }) => (
  element ? `${block}__${element}` : block
);

const getModifiers = ({ base, modifiers }) => (
  R.compose(
    R.fromPairs,
    R.map(([key, val]) => (
      [`${base}--${key}`, val]
    )),
    R.toPairs,
  )(modifiers)
);

export default R.curry(
  (block, element, opts) => {
    const base = getBase({ block, element });
    const modifiers = 'modifiers' in opts ? (
      getModifiers({ base, modifiers: opts.modifiers })
    ) : (
      getModifiers({ base, modifiers: opts })
    );

    return classNames(
      base,
      {
        ...modifiers,
        ...opts.extra,
      },
    );
  },
);
