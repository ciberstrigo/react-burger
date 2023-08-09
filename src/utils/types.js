import PropTypes from "prop-types";

const ingredient = PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
    image_large: PropTypes.string,
    image_mobile: PropTypes.string,
    calories: PropTypes.number,
    carbohydrates: PropTypes.number,
    fat: PropTypes.number,
    proteins: PropTypes.number,
    type: PropTypes.string
})

const types = {
    ingredient: ingredient,
    order: PropTypes.shape({
        name: PropTypes.string,
        order: PropTypes.shape({
            number: PropTypes.number
        }),
        success: PropTypes.bool
    }),
    burger: PropTypes.shape({
        bun: ingredient,
        ingredients: PropTypes.arrayOf(ingredient)
    })
};

export default types;
