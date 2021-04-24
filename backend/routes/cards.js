const router = require('express').Router();

const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  createCardValidation,
  deleteCardValidation,
  changeLikeValidation,
} = require('../middlewares/celebrate');

router.get('/', getCards);
router.post('/', createCardValidation, createCard);
router.delete('/:cardId', deleteCardValidation, deleteCard);
router.put('/:cardId/likes', changeLikeValidation, likeCard);
router.delete('/:cardId/likes', changeLikeValidation, dislikeCard);

module.exports = router;
