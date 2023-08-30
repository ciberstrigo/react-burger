import PropTypes from "prop-types";

const ingredient = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
});

const types = {
    ingredient: ingredient,
    order: PropTypes.shape({
        name: PropTypes.string.isRequired,
        order: PropTypes.shape({
            number: PropTypes.number.isRequired,
        }).isRequired,
        success: PropTypes.bool.isRequired,
    }),
    burger: PropTypes.shape({
        bun: ingredient.isRequired,
        ingredients: PropTypes.arrayOf(ingredient).isRequired,
    }),
};

export default types;
