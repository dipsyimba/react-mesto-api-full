const Card = require('../models/card');

const DatabaseError = require('../errors/databaseError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');
const IncorrectValueError = require('../errors/incorrectValueError');

const getCards = (req, res, next) => {
  Card.find({})
    .orFail(new DatabaseError('В базе данных отсутствуют карточки'))
    .then((cards) => {
      res.send(cards);
    })
    .catch((error) => next(error));
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFoundError('Такая карточка отсутствует'))
    .then((card) => {
      if (req.user._id === String(card.owner)) {
        return Card.findByIdAndDelete(req.params.cardId)
          .then(() => res.send({ message: 'Карточка удалена' }));
      }
      throw new ForbiddenError('У вас нет прав удалять эту карточку!');
    })
    .catch((err) => {
      if (err === 'CastError') {
        next(new NotFoundError('Такая карточка отсутствует'));
      }
      next(err);
    });
};

const createCard = (req, res, next) => {
  const userId = req.user._id;
  const { name, link } = { ...req.body };
  Card.create({ name, link, owner: userId })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectValueError('Введены некорректные данные'));
      }
      next(err);
    });
};

const likeCard = (req, res, next) => {
  const userId = req.user._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .orFail(new NotFoundError('Такая карточка отсутствует'))
    .then((addLike) => {
      res.send(addLike);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Такая карточка отсутствует'));
      }
      next(err);
    });
};

const dislikeCard = (req, res, next) => {
  const userId = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .then((dislike) => {
      if (!dislike) {
        throw new NotFoundError('Такая карточка отсутствует');
      }
      res.send(dislike);
    })
    .catch(next);
};

module.exports = {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
};
