"use strict";

const express = require(`express`);
const request = require(`supertest`);

const articles = require(`./articles`);
const DataService = require(`../data-service/articles`);
const CommentService = require(`../data-service/comment`);

const {HttpCode} = require(`../../constants`);

const mockData = [
  {
    id: `HUCKmH`,
    title: `Обзор новейшего смартфона`,
    createdDate: `27.02.2021 18:36:58`,
    announce: `Как начать действовать? Для начала просто соберитесь. Золотое сечение — соотношение двух величин, гармоническая пропорция. Он написал больше 30 хитов. Первая большая ёлка была установлена только в 1938 году. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
    fullText: `Первая большая ёлка была установлена только в 1938 году. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Программировать не настолько сложно, как об этом говорят. Это один из лучших рок-музыкантов. Достичь успеха помогут ежедневные повторения. Из под его пера вышло 8 платиновых альбомов. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Золотое сечение — соотношение двух величин, гармоническая пропорция. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
    category: [`Железо`],
    comments: [
      {id: `QDP4tS`, text: `Плюсую, но слишком много буквы!`},
      {
        id: `4HEX0F`,
        text: `Мне кажется или я уже читал это где-то? Это где ж такие красоты? Хочу такую же футболку :-)`,
      },
    ],
  },
  {
    id: `HqHITi`,
    title: `Борьба с прокрастинацией`,
    createdDate: `15.12.2020 18:36:58`,
    announce: `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Золотое сечение — соотношение двух величин, гармоническая пропорция. Собрать камни бесконечности легко, если вы прирожденный герой. Ёлки — это не просто красивое дерево. Это прочная древесина. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
    fullText: `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Простые ежедневные упражнения помогут достичь успеха. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Программировать не настолько сложно, как об этом говорят. Он написал больше 30 хитов. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Достичь успеха помогут ежедневные повторения. Первая большая ёлка была установлена только в 1938 году. Из под его пера вышло 8 платиновых альбомов. Ёлки — это не просто красивое дерево. Это прочная древесина. Собрать камни бесконечности легко, если вы прирожденный герой. Золотое сечение — соотношение двух величин, гармоническая пропорция. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Это один из лучших рок-музыкантов.`,
    category: [`Железо`],
    comments: [
      {
        id: `8JOtuD`,
        text: `Это где ж такие красоты? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Плюсую, но слишком много буквы!`,
      },
      {id: `KzMY_x`, text: `Мне кажется или я уже читал это где-то?`},
      {id: `YRj_1K`, text: `Планируете записать видосик на эту тему?`},
      {id: `sBO8BA`, text: `Согласен с автором!`},
      {id: `Z4A_ek`, text: `Это где ж такие красоты? Совсем немного...`},
    ],
  },
  {
    id: `IZBYq8`,
    title: `Полезные советы`,
    createdDate: `19.02.2021 18:36:58`,
    announce: `Ёлки — это не просто красивое дерево. Это прочная древесина. Из под его пера вышло 8 платиновых альбомов. Золотое сечение — соотношение двух величин, гармоническая пропорция. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Он написал больше 30 хитов.`,
    fullText: `Достичь успеха помогут ежедневные повторения. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Собрать камни бесконечности легко, если вы прирожденный герой. Он написал больше 30 хитов. Первая большая ёлка была установлена только в 1938 году. Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
    category: [`Личный рост`],
    comments: [
      {
        id: `D_usy4`,
        text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`,
      },
      {
        id: `L5cb72`,
        text: `Плюсую, но слишком много буквы! Это где ж такие красоты?`,
      },
      {
        id: `a8E-Ih`,
        text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне кажется или я уже читал это где-то?`,
      },
      {
        id: `UI2OQG`,
        text: `Это где ж такие красоты? Плюсую, но слишком много буквы!`,
      },
    ],
  },
  {
    id: `90PMdy`,
    title: `Как перестать беспокоиться и начать жить`,
    createdDate: `06.03.2021 18:36:58`,
    announce: `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Как начать действовать? Для начала просто соберитесь. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Простые ежедневные упражнения помогут достичь успеха.`,
    fullText: `Простые ежедневные упражнения помогут достичь успеха. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Это один из лучших рок-музыкантов.`,
    category: [`За жизнь`],
    comments: [
      {
        id: `Ix6Rw5`,
        text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Это где ж такие красоты?`,
      },
    ],
  },
  {
    id: `bvbAq4`,
    title: `Самый лучший музыкальный альбом этого года`,
    createdDate: `05.02.2021 18:36:58`,
    announce: `Достичь успеха помогут ежедневные повторения. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Из под его пера вышло 8 платиновых альбомов.`,
    fullText: `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Из под его пера вышло 8 платиновых альбомов. Программировать не настолько сложно, как об этом говорят. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
    category: [`Деревья`],
    comments: [
      {
        id: `jPIB5h`,
        text: `Это где ж такие красоты? Планируете записать видосик на эту тему? Согласен с автором!`,
      },
      {
        id: `1p_Mh6`,
        text: `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Хочу такую же футболку :-)`,
      },
      {id: `cGGecS`, text: `Мне кажется или я уже читал это где-то?`},
      {
        id: `iuJbFB`,
        text: `Согласен с автором! Это где ж такие красоты? Мне кажется или я уже читал это где-то?`,
      },
    ],
  },
];

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  articles(app, new DataService(cloneData), new CommentService());
  return app;
};

describe(`API returns a list of all articles`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).get(`/articles`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns a list of 5 articles`, () =>
    expect(response.body.length).toBe(5));

  test(`First article's id equals "HUCKmH"`, () =>
    expect(response.body[0].id).toBe(`HUCKmH`));
});

describe(`API returns an article with given id`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).get(`/articles/HUCKmH`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Offer's title is "Обзор новейшего смартфона"`, () =>
    expect(response.body.title).toBe(`Обзор новейшего смартфона`));
});

describe(`API creates an offer if data is valid`, () => {
  const newArticle = {
    category: `Железо`,
    title: `Жизнь на Марсе`,
    createdDate: `31.03.2021 18:36:58`,
    announce: `О возможности существования жизни на Марсе люди размышляли веками из-за близости планеты и её сходства с Землёй[1]. Поиск признаков жизни начался в XIX веке и продолжается по настоящее время.`,
    fullText: `О возможности существования жизни на Марсе люди размышляли веками из-за близости планеты и её сходства с Землёй[1]. Поиск признаков жизни начался в XIX веке и продолжается по настоящее время. С 1960-х годов телескопические наблюдения дополнили запуски автоматических межпланетных станций для изучения планеты, вначале с пролётной траектории, а затем с орбиты искусственного спутника. С 1971 года проводятся исследования автоматическими марсианскими станциями непосредственно на поверхности, сначала неподвижными, а затем марсоходами.`,
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).post(`/articles`).send(newArticle);
  });

  test(`Status code 201`, () => {
    expect(response.statusCode).toBe(HttpCode.CREATED);
  });

  test(`Returns article created`, () =>
    expect(response.body).toEqual(expect.objectContaining(newArticle)));

  test(`Articles count is changed`, () =>
    request(app)
      .get(`/articles`)
      .expect((res) => expect(res.body.length).toBe(6)));
});

describe(`API refuses to create an offer if data is invalid`, () => {
  const newArticle = {
    category: `Железо`,
    title: `Жизнь на Марсе`,
    announce: `О возможности существования жизни на Марсе люди размышляли веками из-за близости планеты и её сходства с Землёй[1]. Поиск признаков жизни начался в XIX веке и продолжается по настоящее время.`,
    fullText: `О возможности существования жизни на Марсе люди размышляли веками из-за близости планеты и её сходства с Землёй[1]. Поиск признаков жизни начался в XIX веке и продолжается по настоящее время. С 1960-х годов телескопические наблюдения дополнили запуски автоматических межпланетных станций для изучения планеты, вначале с пролётной траектории, а затем с орбиты искусственного спутника. С 1971 года проводятся исследования автоматическими марсианскими станциями непосредственно на поверхности, сначала неподвижными, а затем марсоходами.`,
  };
  const app = createAPI();

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newArticle)) {
      const badArticle = {...newArticle};
      delete badArticle[key];
      await request(app)
        .post(`/articles`)
        .send(badArticle)
        .expect(HttpCode.BAD_REQUEST);
    }
  });
});

describe(`API changes existent article`, () => {
  const newArticle = {
    category: `Железо`,
    title: `Жизнь на Марсе`,
    announce: `О возможности существования жизни на Марсе люди размышляли веками из-за близости планеты и её сходства с Землёй[1]. Поиск признаков жизни начался в XIX веке и продолжается по настоящее время.`,
    fullText: `О возможности существования жизни на Марсе люди размышляли веками из-за близости планеты и её сходства с Землёй[1]. Поиск признаков жизни начался в XIX веке и продолжается по настоящее время. С 1960-х годов телескопические наблюдения дополнили запуски автоматических межпланетных станций для изучения планеты, вначале с пролётной траектории, а затем с орбиты искусственного спутника. С 1971 года проводятся исследования автоматическими марсианскими станциями непосредственно на поверхности, сначала неподвижными, а затем марсоходами.`,
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).put(`/articles/HUCKmH`).send(newArticle);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns changed offer`, () =>
    expect(response.body).toEqual(expect.objectContaining(newArticle)));

  test(`Offer is really changed`, () =>
    request(app)
      .get(`/articles/HUCKmH`)
      .expect((res) => expect(res.body.title).toBe(`Жизнь на Марсе`)));
});

test(`API returns status code 404 when trying to change non-existent article`, () => {
  const app = createAPI();

  const validArticle = {
    category: `Железо`,
    title: `Жизнь на Марсе`,
    announce: `О возможности существования жизни на Марсе люди размышляли веками из-за близости планеты и её сходства с Землёй[1]. Поиск признаков жизни начался в XIX веке и продолжается по настоящее время.`,
    fullText: `О возможности существования жизни на Марсе люди размышляли веками из-за близости планеты и её сходства с Землёй[1]. Поиск признаков жизни начался в XIX веке и продолжается по настоящее время. С 1960-х годов телескопические наблюдения дополнили запуски автоматических межпланетных станций для изучения планеты, вначале с пролётной траектории, а затем с орбиты искусственного спутника. С 1971 года проводятся исследования автоматическими марсианскими станциями непосредственно на поверхности, сначала неподвижными, а затем марсоходами.`,
  };

  return request(app)
    .put(`/articles/NOEXST`)
    .send(validArticle)
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an article with invalid data`, () => {
  const app = createAPI();

  const invalidArticle = {
    category: `Железо`,
    title: `Жизнь на Марсе`,
    announce: `О возможности существования жизни на Марсе люди размышляли веками из-за близости планеты и её сходства с Землёй[1]. Поиск признаков жизни начался в XIX веке и продолжается по настоящее время.`,
  };

  return request(app)
    .put(`/articles/NOEXST`)
    .send(invalidArticle)
    .expect(HttpCode.BAD_REQUEST);
});

test(`API refuses to delete non-existent article`, () => {
  const app = createAPI();

  return request(app).delete(`/articles/NOEXST`).expect(HttpCode.NOT_FOUND);
});

describe(`API returns a list of comments to given article`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).get(`/articles/HUCKmH/comments`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list of 2 comments`, () =>
    expect(response.body.length).toBe(2));

  test(`First comment's id is "QDP4tS"`, () =>
    expect(response.body[0].id).toBe(`QDP4tS`));
});

describe(`API creates a comment if data is valid`, () => {
  const newComment = {
    text: `Валидному комментарию достаточно этого поля`,
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/articles/HUCKmH/comments`)
      .send(newComment);
  });

  test(`Status code 201`, () =>
    expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Returns comment created`, () =>
    expect(response.body).toEqual(expect.objectContaining(newComment)));

  test(`Comments count is changed`, () =>
    request(app)
      .get(`/articles/HUCKmH/comments`)
      .expect((res) => expect(res.body.length).toBe(3)));
});

test(`API refuses to create a comment to non-existent article and returns status code 404`, () => {
  const app = createAPI();

  return request(app)
    .post(`/articles/NOEXST/comments`)
    .send({
      text: `Неважно`,
    })
    .expect(HttpCode.NOT_FOUND);
});

test(`API refuses to create a comment when data is invalid, and returns status code 400`, () => {
  const app = createAPI();

  return request(app)
    .post(`/articles/HUCKmH/comments`)
    .send({})
    .expect(HttpCode.BAD_REQUEST);
});

test(`API refuses to delete non-existent comment`, () => {
  const app = createAPI();

  return request(app)
    .delete(`/articles/HUCKmH/comments/NOEXST`)
    .expect(HttpCode.NOT_FOUND);
});

test(`API refuses to delete a comment to non-existent article`, () => {
  const app = createAPI();

  return request(app)
    .delete(`/articles/NOEXST/comments/QDP4tS`)
    .expect(HttpCode.NOT_FOUND);
});

describe(`API correctly deletes a comment`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).delete(`/articles/HUCKmH/comments/QDP4tS`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns comment deleted`, () =>
    expect(response.body.id).toBe(`QDP4tS`));

  test.skip(`Comments count is 1 now`, () =>
    request(app)
      .get(`/articles/HUCKmH/comments`)
      .expect((res) => expect(res.body.length).toBe(1)));
});


describe(`API correctly deletes an article`, () => {
  const app = createAPI();

  let response;
  beforeAll(async () => {
    response = await request(app).delete(`/articles/HUCKmH`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns deleted article`, () => expect(response.body.id).toBe(`HUCKmH`));

  test.skip(`Artiles count is 4 now`, () =>
    request(app)
      .get(`/articles`)
      .expect((res) => expect(res.body.length).toBe(4)));
});
