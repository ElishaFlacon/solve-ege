create TABLE user_account (
    id SERIAL PRIMARY KEY,
    email VARCHAR,
    password VARCHAR,
    roles VARCHAR[] DEFAULT '{"user_role"}',
    isActivated BOOLEAN DEFAULT false,
    activationLink VARCHAR
);


create TABLE user_token (
    id SERIAL PRIMARY KEY,
    usver SERIAL REFERENCES user_account,
    refreshToken VARCHAR
);


create TABLE task_ege (
    id SERIAL PRIMARY KEY,
    subject VARCHAR, -- код предмета
    number SMALLINT, -- номер задания
    description VARCHAR, -- описание задания (Найдите кол-во букв А в предложении)
    quest VARCHAR, -- само задание, тут само предложение (Привет мир! Я арбуз.)
    picture VARCHAR, -- картинка
    answer VARCHAR -- ответ
);


create TABLE subjects_ege (
    id VARCHAR PRIMARY KEY,-- код предмета
    name VARCHAR, -- название предмета
    tasks INT, -- кол-во заданий
    timer INT -- кол-во времени на решение (в миллисекундах)
);


create TABLE options_ege (
    id SERIAL PRIMARY KEY,
    subject VARCHAR, -- код предмета
    tasks VARCHAR[] -- тут лежит массив айдишников заданий
);


----------------------------! SUBJECTS EGE !----------------------------


--* РУССКИЙ ЯЗЫК (БЕЗ СОЧИНЕНИЯ) 01 *--
INSERT INTO subjects_ege (id, name, tasks, timer) values ('01', 'русский язык', 26, (3.5 * 60 * 60 * 1000));

--* МАТЕМАТИКА ПРОФИЛЬНАЯ 02 *--
INSERT INTO subjects_ege (id, name, tasks, timer) values ('02', 'математика профильная', 18, (4 * 60 * 60 * 1000));

--* МАТЕМАТИКА БАЗОВАЯ 22 *--
INSERT INTO subjects_ege (id, name, tasks, timer) values ('0', '', 1, (1 * 60 * 60 * 1000));

--* ФИЗИКА 03 *--
INSERT INTO subjects_ege (id, name, tasks, timer) values ('0', '', 1, (1 * 60 * 60 * 1000));

--* ХИМИЯ 04 *--
INSERT INTO subjects_ege (id, name, tasks, timer) values ('0', '', 1, (1 * 60 * 60 * 1000));

--* ИНФОРМАТИКА И ИКТ 25 *--
INSERT INTO subjects_ege (id, name, tasks, timer) values ('25', 'информатика и икт', 27, (4 * 60 * 60 * 1000));

--* БИОЛОГИЯ 06 *--
INSERT INTO subjects_ege (id, name, tasks, timer) values ('0', '', 1, (1 * 60 * 60 * 1000));

--* ИСТОРИЯ 07 *--
INSERT INTO subjects_ege (id, name, tasks, timer) values ('0', '', 1, (1 * 60 * 60 * 1000));

--* ГЕОГРАФИЯ 08 *--
INSERT INTO subjects_ege (id, name, tasks, timer) values ('0', '', 1, (1 * 60 * 60 * 1000));

--* АНГЛИЙСКИЙ ЯЗЫК 09 *--
INSERT INTO subjects_ege (id, name, tasks, timer) values ('0', '', 1, (1 * 60 * 60 * 1000));

--* НЕМЕЦКИЙ ЯЗЫК 10 *--
INSERT INTO subjects_ege (id, name, tasks, timer) values ('0', '', 1, (1 * 60 * 60 * 1000));

--* ФРАНЦУЗКИЙ ЯЗЫК 11 *--
INSERT INTO subjects_ege (id, name, tasks, timer) values ('0', '', 1, (1 * 60 * 60 * 1000));

--* ОБЩЕСТВОЗНАНИЕ 12 *--
INSERT INTO subjects_ege (id, name, tasks, timer) values ('0', '', 1, (1 * 60 * 60 * 1000));

--* ИСПАНСКИЙ ЯЗЫК 13 *--
INSERT INTO subjects_ege (id, name, tasks, timer) values ('0', '', 1, (1 * 60 * 60 * 1000));

--* КИТАЙСКИЙ ЯЗЫК 14 *--
INSERT INTO subjects_ege (id, name, tasks, timer) values ('0', '', 1, (1 * 60 * 60 * 1000));

--* ЛИТЕРАТУРА 18 *--
INSERT INTO subjects_ege (id, name, tasks, timer) values ('0', '', 1, (1 * 60 * 60 * 1000));


----------------------------! SUBJECTS EGE !----------------------------












-- INSERT INTO user_account (email, password, roles, activationLink) values ('bob@mail.gg', '012345', '{"admin_role"}','activ-link-999-jopa');
-- SELECT * FROM user_account;
-- UPDATE user_account set email='bob@mail.jj' where id=1;
-- SELECT * FROM user_account; SELECT * FROM user_token;
-- DELETE FROM user_token *; DELETE FROM user_account *;

