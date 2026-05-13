const express = require("express");
const app = express();
const oracledb = require("oracledb");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// ekhane object banalam
const dbconfig = {
  user: "TESTPROJECT",
  password: "test", // contains the hr schema password
  connectString: "localhost/orclpdb",
};

app.listen(5000, () => {
  console.log("app is listening");
});

//post er jonno value request korlam
//query liklam
//query execute kore insert dibo
//res json pathano lage na holey front end respond na pele arekpage e jai na

// ekhane 5000/signup api e data pathai res er sahajje are req sahajje oi api theke data nei
app.post("/signup", async (req, res) => {
  try {
    const values = {
      fname: req.body.fname,
      lname: req.body.lname,
      dob: req.body.dob,
      email: req.body.email,
      country: req.body.country,
      gen: req.body.gen,
      username: req.body.username,
      password: req.body.password,
      // Add other properties as needed
    };

    console.log(typeof values.country);

    const connection = await oracledb.getConnection(dbconfig);
    const query = `INSERT INTO "TESTPROJECT"."USERS"("FIRST_NAME", "LAST_NAME", "DATE_OF_BIRTH", "EMAIL", "COUNTRY", "GENDER", "USER_NAME", "PASSWORD") VALUES ( :fname, :lname, TO_DATE(:dob, 'DD-MM-YYYY'), :email, :country, :gen, :username, :password)`;

    const result = await connection.execute(query, values, {
      autoCommit: true,
    });
    // const query = 'INSERT INTO "TESTPROJECT"."PERSONS"("NAME" ) VALUES (:fname)';

    // const result = await connection.execute(query, values.fname, { autoCommit: true });
    console.log(result.rows);

    res.json({ message: "User successfully added", result: result });

    await connection.close();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

app.post("/signin", async (req, res) => {
  try {
    const values = {
      username: req.body.username,
      password: req.body.password,
      // Add other properties as needed
    };
    const name = values.username;
    const password = values.password;
    const connection = await oracledb.getConnection(dbconfig);
    // const query = `SELECT* FROM "TESTPROJECT"."PERSONS" WHERE "NAME" ='${name}'`;

    const result = await connection.execute(
      `SELECT* FROM "TESTPROJECT"."USERS" WHERE "USER_NAME" ='${name}' AND "PASSWORD"='${password}'`
    );

    //res.json({ success: true , message: "login successfully added", result: result });

    if (result.rows.length > 0) {
      const query = `DECLARE
                                  BEGIN
                                    RECORD_LOG(:username, :functname, :param);
                                  END;`;
      const logvalues = {
        username: String(name),
        functname: "Logged In",
        param: String(name),
      };
      const resultlog = await connection.execute(query, logvalues, {
        autoCommit: true,
      });

      res.json({
        success: true,
        message: "Login successful",
        result: result.rows,
      });
    } else {
      res.json({ success: false, message: "No user found with that name" });
    }
    await connection.close();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

// eti 5000/api e data pathai res.json use kore eti json oi api e pathai frontend oikhan theke data collect kore
app.get("/homepage", async (req, res) => {
  try {
    const connection = await oracledb.getConnection(dbconfig);

    const result = await connection.execute(
      `SELECT * FROM "TESTPROJECT"."MOVIE"`
    );

    await connection.close(); // Always close connections

    // res.json({ users: ["user1", "user2"] });
    // array er naam movies pore ekey  json e noye gelam

    res.json({ movies: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/homepage2", async (req, res) => {
  try {
    const connection = await oracledb.getConnection(dbconfig);

    const result = await connection.execute(
      `SELECT * FROM "TESTPROJECT"."MOVIE"`
    );

    await connection.close(); // Always close connections

    // res.json({ users: ["user1", "user2"] });
    // array er naam movies pore ekey  json e noye gelam

    res.json({ movies: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/MoviePage", async (req, res) => {
  try {
    const values = {
      // username: req.body.username,
      // password: req.body.password,
      idOfMovie: req.body.id,
      // Add other properties as needed
    };
    const name= req.body.username;
    const id = values.idOfMovie;
    const connection = await oracledb.getConnection(dbconfig);
    // const query = `SELECT* FROM "TESTPROJECT"."PERSONS" WHERE "NAME" ='${name}'`;

    const oneMovie = await connection.execute(
      `SELECT* FROM "TESTPROJECT"."MOVIE" WHERE "MOVIE_ID" ='${id}'`
    );

    const query = `DECLARE
                    BEGIN
                      RECORD_LOG(:username, :functname, :param);
                    END;`;
      const logvalues = {
        username: String(name),
        functname: "MOVIE SELECT",
        param: String(id),
      };
      const resultlog = await connection.execute(query, logvalues, {
        autoCommit: true,
      });

    res.json({ message: "login successfully added", oneMovie: oneMovie });
    console.log("Result is:", oneMovie.rows);

    await connection.close();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

app.post("/insertmovie", async (req, res) => {
  try {
    const values = {
      moviename: req.body.moviename,
      synopsys: req.body.synopsys,
      genre: req.body.genre,
      dor: req.body.dor,
      duration: req.body.duration,
      fposter: req.body.fposter,
      bposter: req.body.bposter,
      rating: req.body.rating,
      // Add other properties as needed
    };
    const moviename = req.body.moviename;

    console.log(values);
    const connection = await oracledb.getConnection(dbconfig);
    const query = `DECLARE
                     result NUMBER;
                   BEGIN
                     result := ADD_TO_MOVIE(:moviename, :synopsys, :genre, :dor, :duration, :fposter, :bposter, :rating);
                     DBMS_OUTPUT.PUT_LINE(result);
                   END;`;

    const result = await connection.execute(query, values, {
      autoCommit: true,
    });
    console.log(values);

    console.log(result);

    res.json({ message: "movie successfully added", result: result });

    const logquery = `DECLARE
                      BEGIN
                        RECORD_LOG(:username, :functname, :param);
                      END;`;
                  const logvalues = {
                  username: String("ADMIN"),
                  functname: "ADD_TO_MOVIE",
                  param: String(moviename)
                  };
                  const resultlog = await connection.execute(logquery, logvalues, {
                  autoCommit: true,
                  });


    await connection.close();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

app.post("/MovieGenre", async (req, res) => {
  try {
    const values = {
      idOfMovie: req.body.id,
    };
    const id = values.idOfMovie;
    const connection = await oracledb.getConnection(dbconfig);
    // const query = `SELECT* FROM "TESTPROJECT"."PERSONS" WHERE "NAME" ='${name}'`;

    const oneMovie = await connection.execute(`SELECT GENRE_NAME
                                                  FROM MOVIE  JOIN MOVIE_GENRE ON MOVIE.MOVIE_ID=MOVIE_GENRE.MOVIE_ID
                                                  JOIN GENRE ON GENRE.GENRE_ID= MOVIE_GENRE.GENRE_ID 
                                                  WHERE MOVIE.MOVIE_ID= '${id}'`);

    res.json({ message: "genre got", oneMovie: oneMovie });
    console.log("Result is:", oneMovie.rows);

    await connection.close();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

app.post("/MovieActors", async (req, res) => {
  try {
    const values = {
      idOfMovie: req.body.id,
    };
    const id = values.idOfMovie;
    const connection = await oracledb.getConnection(dbconfig);
    // const query = `SELECT* FROM "TESTPROJECT"."PERSONS" WHERE "NAME" ='${name}'`;

    const oneMovie = await connection.execute(`SELECT 
                                                  (SELECT FIRST_NAME || ' ' || LAST_NAME FROM ACTORS WHERE ACTOR_ID = C.ACTOR_ID) AS NAMES,
                                                  (SELECT ACTOR_IMG FROM ACTORS WHERE ACTOR_ID = C.ACTOR_ID) AS ACTOR_IMG
                                                FROM 
                                                  CASTS C 
                                                JOIN 
                                                  MOVIE M ON C.MOVIE_ID = M.MOVIE_ID
                                                WHERE 
                                                  C.MOVIE_ID = '${id}'`);

    res.json({ message: "genre got", oneMovie: oneMovie });
    console.log("Result is:", oneMovie.rows);

    await connection.close();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

app.post("/reviews", async (req, res) => {
  try {
    const values = {
      idOfMovie: req.body.id,
    };
    const id = values.idOfMovie;
    console.log(id);
    const connection = await oracledb.getConnection(dbconfig);
    // const query = `SELECT* FROM "TESTPROJECT"."PERSONS" WHERE "NAME" ='${name}'`;

    const oneMovie =
      await connection.execute(`SELECT R.REV_COMMENT, R.RATING, U.USER_NAME
                                                  FROM REVIEWS R JOIN USERS U on (R.USER_ID = U.USER_ID)
                                                  WHERE R.MOVIE_ID='${id}'`);

    res.json({ message: "reviews got", oneMovie: oneMovie });
    console.log("Result is:", oneMovie.rows);

    await connection.close();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

app.post("/myreview", async (req, res) => {
  try {
    const values = {
      username: req.body.username,
      id: req.body.id,
    };
    const username = values.username;
    const id = values.id;
    console.log(id);
    const connection = await oracledb.getConnection(dbconfig);
    // const query = `SELECT* FROM "TESTPROJECT"."PERSONS" WHERE "NAME" ='${name}'`;

    const oneMovie =
      await connection.execute(`SELECT U.USER_NAME,R.REV_COMMENT,R.RATING
                                                  FROM REVIEWS R JOIN USERS U ON( R.USER_ID= U.USER_ID)
                                                  WHERE U.USER_NAME= '${username}' AND R.MOVIE_ID=${id}`);

    res.json({ message: "reviews got", oneMovie: oneMovie });
    console.log("Result is:", oneMovie.rows);

    await connection.close();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

app.post("/search", async (req, res) => {
  console.log("hello2");
  try {
    const values = {
      searchId: req.body.searchId,
      searchStr: req.body.searchStr,
    };
    const searchId = values.searchId;
    const searchStr = values.searchStr;

    const name= req.body.username;
    console.log(searchId + searchStr);

    const connection = await oracledb.getConnection(dbconfig);
    // const query = `SELECT* FROM "TESTPROJECT"."PERSONS" WHERE "NAME" ='${name}'`;

    if (searchId === "1") {
      console.log("helloin if");
      const oneMovie = await connection.execute(`SELECT DISTINCT  M.*
                                                    FROM MOVIE M LEFT JOIN MOVIE_GENRE MG on(M.MOVIE_ID=MG.MOVIE_ID)
                                                    LEFT JOIN GENRE G ON ( MG.GENRE_ID = G.GENRE_ID)
                                                    LEFT JOIN EPISODE E ON (M.MOVIE_ID=E.SERIESE_ID)
                                                    LEFT JOIN CASTS C ON( C.MOVIE_ID= M.MOVIE_ID)
                                                    LEFT JOIN ACTORS A ON( C.ACTOR_ID=A.ACTOR_ID)
                                                    LEFT JOIN PRODUCTION_HOUSE PH ON (PH.PH_ID= M.PH_ID)
                                                    LEFT JOIN WRITER_MOVIE WM ON (WM.MOVIE_ID = M.MOVIE_ID)
                                                    LEFT JOIN WRITERS W ON (W.WRITER_ID= WM.WRITER_ID)
                                                    LEFT JOIN DIRECT_MOVIE DM ON (DM.MOVIE_ID = M.MOVIE_ID)
                                                    LEFT JOIN DIRECTORS D ON (D.DIRECTOR_ID= DM.DIRECTOR_ID)
                                                    LEFT JOIN HALL_SHOW HS ON (M.MOVIE_ID = HS.MOVIE_ID)
                                                    LEFT JOIN HALLS H ON( HS.HALL_ID = H.HALL_ID)
                                                    WHERE 
                                                    UPPER(  M.TITLE || M.IMDB_RATING 
                                                        ||G.GENRE_NAME || E.EPISODE_TITLE || C.ROLE_NAME || A.FIRST_NAME 
                                                        || A.LAST_NAME || PH.PH_NAME || W.FIRST_NAME || W.LAST_NAME 
                                                        || D.FIRST_NAME || D.LAST_NAME || H.HALL_NAME) LIKE UPPER('%${searchStr}%')`);
       
      res.json({ message: "reviews got", oneMovie: oneMovie });
      console.log("Result is:", oneMovie.rows);
      console.log("here are the movies");

      const logquery = `DECLARE
                     BEGIN
                       RECORD_LOG(:username, :functname, :param);
                     END;`;
      const logvalues = {
        username: String(name),
        functname: "Searched By",
        param: String("Any, " + searchStr)
      };
      const resultlog = await connection.execute(logquery, logvalues, {
        autoCommit: true,
      });

      await connection.close();
    }

    if (searchId === "3") {
      const oneMovie = await connection.execute(`SELECT DISTINCT M.*
                                          FROM MOVIE M LEFT JOIN MOVIE_GENRE MG on(M.MOVIE_ID=MG.MOVIE_ID)
                                          LEFT JOIN GENRE G ON ( MG.GENRE_ID = G.GENRE_ID)
                                          WHERE UPPER(G.GENRE_NAME) LIKE UPPER('%${searchStr}%')`);

           const logquery = `DECLARE
                               BEGIN
                                 RECORD_LOG(:username, :functname, :param);
                               END;`;

                const logvalues = {
                  username: String(name),
                  functname: "Searched By",
                  param: String("Genre, " + searchStr)
                };
                const resultlog = await connection.execute(logquery, logvalues, {
                  autoCommit: true,
                });
                     
      res.json({ message: "reviews got", oneMovie: oneMovie });
      console.log("Result is:", oneMovie.rows);
      console.log("here are the movies");

      await connection.close();
    }

    if (searchId === "2") {
      const oneMovie = await connection.execute(`SELECT *
                                                  FROM MOVIE 
                                                  WHERE UPPER(TITLE) LIKE UPPER('%${searchStr}%')`);

      res.json({ message: "reviews got", oneMovie: oneMovie });
      console.log("Result is:", oneMovie.rows);
      console.log("here are the movies");

    const logquery = `DECLARE
                BEGIN
                  RECORD_LOG(:username, :functname, :param);
                END;`;

          const logvalues = {
          username: String(name),
          functname: "Searched By",
          param: String("Title, " + searchStr)
          };

          const resultlog = await connection.execute(logquery, logvalues, {
          autoCommit: true,
          });          


      await connection.close();
    }
    if (searchId === "4") {
      const oneMovie = await connection.execute(`SELECT DISTINCT M.*
      FROM MOVIE M 
      LEFT JOIN CASTS C ON(M.MOVIE_ID= C.MOVIE_ID)
      LEFT JOIN ACTORS A ON(A.ACTOR_ID= C.ACTOR_ID)
      WHERE UPPER( (A.FIRST_NAME || A.LAST_NAME)) LIKE  UPPER('%${searchStr}%')`);

      res.json({ message: "reviews got", oneMovie: oneMovie });
      console.log("Result is:", oneMovie.rows);
      console.log("here are the movies");

       const logquery = `DECLARE
              BEGIN
                RECORD_LOG(:username, :functname, :param);
              END;`;

        const logvalues = {
        username: String(name),
        functname: "Searched By",
        param: String("Actor, " + searchStr)
        };

        const resultlog = await connection.execute(logquery, logvalues, {
        autoCommit: true,
        });        


      await connection.close();
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

app.post("/reviewadd", async (req, res) => {
  try {
    const hillol = {
      id: req.body.id,
      username: req.body.username,
      userComment: req.body.userComment,
      rating: req.body.rating,
    };

    const name= req.body.username;
    const id= req.body.id;
    const comment= req.body.userComment;
    const rating = req.body.rating;

    console.log(hillol);

    const connection = await oracledb.getConnection(dbconfig);

    const query = `DECLARE
                      BEGIN
                      REVIEW_CONFIRM_CLICKED( :id, :username, :userComment, :rating);
                      
                      END;`;

    const result = await connection.execute(query, hillol, {
      autoCommit: true,
    });
    const query1 = `DECLARE
                      BEGIN
                      SET_OUR_RATING(${id});
                      END;`;

                      const result1 = await connection.execute(query1);

    console.log("succcsess");
    res.json({ success: true, message: "Review added successfully" });
    //res.json({ success: true , message: "login successfully added", result: result });
     
    const logquery = `DECLARE
            BEGIN
              RECORD_LOG(:username, :functname, :param);
            END;`;

        const logvalues = {
        username: String(name),
        functname: "REVIEW_CONFIRM_CLICKED",
        param: String( name +", " + id +", "+comment+", "+ rating)
        };

        const resultlog = await connection.execute(logquery, logvalues, {
        autoCommit: true,
        });       



    await connection.close();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

app.post("/profile", async (req, res) => {
  try {
    const values = {
      username: req.body.username,
    };
    const username = values.username;

    console.log(username);
    const connection = await oracledb.getConnection(dbconfig);
    // const query = `SELECT* FROM "TESTPROJECT"."PERSONS" WHERE "NAME" ='${name}'`;

    const oneProfile = await connection.execute(`SELECT *
                                                  FROM USERS
                                                  WHERE USER_NAME= '${username}'`);

    res.json({ message: "profile got", oneProfile: oneProfile });
    console.log("Result is:", oneProfile.rows);

    await connection.close();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

app.post("/reviewdelete", async (req, res) => {
  try {
    const deleteitems = {
      username: req.body.username,
      id: req.body.id,
    };

    const name = req.body.username;
    const id= req.body.id;

    console.log(deleteitems);

    const connection = await oracledb.getConnection(dbconfig);

    const query = `BEGIN
                        delete_review(:username,:id );
                        END;`;

    const result = await connection.execute(query, deleteitems, {
      autoCommit: true,
    });

    console.log("succcsess");
    res.json({ success: true, message: "Review delete successfully" });
    //res.json({ success: true , message: "login successfully added", result: result });


    const logquery = `DECLARE
                    BEGIN
                      RECORD_LOG(:username, :functname, :param);
                    END;`;
                const logvalues = {
                username: String(name),
                functname: "delete_review",
                param: String(name +", " + id)
                };
                const resultlog = await connection.execute(logquery, logvalues, {
                autoCommit: true,
                });               

    await connection.close();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

app.post("/adddeletelist", async (req, res) => {
  try {
    const items = {
      var: req.body.var,
      username: req.body.username,
      id: req.body.id,
    };

    const name= req.body.username;
    const v=req.body.var;
    const id=req.body.id;

    const connection = await oracledb.getConnection(dbconfig);

    const query = `DECLARE
                      BEGIN
                      UPDATE_LIST(:var, :username, :id);
                      END;`;

    const result = await connection.execute(query, items, { autoCommit: true });

    console.log("succcsess");
    res.json({ success: true, message: "Review delete successfully" });
    //res.json({ success: true , message: "login successfully added", result: result });

    const logquery = `DECLARE
                     BEGIN
                  RECORD_LOG(:username, :functname, :param);
                END;`;
            const logvalues = {
            username: String(name),
            functname: "UPDATE_LIST",
            param: String(name+", " + v +","+ id)
            };

            const resultlog = await connection.execute(logquery, logvalues, {
            autoCommit: true,
            });           


    await connection.close();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

app.post("/getfav", async (req, res) => {
  try {
    const id = req.body.id;
    const username = req.body.username;

    console.log(id + " " + username);
    console.log("int the test");
    const connection = await oracledb.getConnection(dbconfig);
    // const query = `SELECT* FROM "TESTPROJECT"."PERSONS" WHERE "NAME" ='${name}'`;

    const result = await connection.execute(
      `DECLARE
                                      X VARCHAR(100);
                                      BEGIN
                                        X :=IS_FAVOURITE(:username,:id);
                                        :title :=X;
                                      END;`,
      {
        username: username,
        id: id,
        title: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
      }
    );
    console.log(result.outBinds.title);

    let num = parseInt(result.outBinds.title);
    if (num === 1) {
      res.json({ message: "fav list have it", answer: true });
    } else {
      res.json({ message: "fav list have it", answer: false });
    }

    await connection.close();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

app.post("/getwatch", async (req, res) => {
  try {
    const id = req.body.id;
    const username = req.body.username;
    console.log("int the watch");
    const connection = await oracledb.getConnection(dbconfig);
    // const query = `SELECT* FROM "TESTPROJECT"."PERSONS" WHERE "NAME" ='${name}'`;

    const result = await connection.execute(
      `DECLARE
                                      X VARCHAR(100);
                                      BEGIN
                                        X :=IS_WATCHED(:username,:id);
                                        :title :=X;
                                      END;`,
      {
        id: id,
        username: username,
        title: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
      }
    );
    console.log(typeof result.outBinds.title);

    let num = parseInt(result.outBinds.title);
    if (num === 1) {
      res.json({ message: "watch list have it", answer: true });
    } else {
      res.json({ message: "watch list have it", answer: false });
    }

    await connection.close();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

app.post("/getfavmovie", async (req, res) => {
  try {
    const items = {
      username: req.body.username,
    };

    const connection = await oracledb.getConnection(dbconfig);

    const query = `SELECT M.*
                      FROM MOVIE M
                      JOIN FAV_LIST F ON (M.MOVIE_ID=F.MOVIE_ID)
                      WHERE USER_ID=(SELECT USER_ID FROM USERS WHERE USER_NAME=:username)`;

    const result = await connection.execute(query, items, { autoCommit: true });

    console.log("here is the result");
    res.json({
      success: true,
      message: "Review delete successfully",
      result: result,
    });
    //res.json({ success: true , message: "login successfully added", result: result });
    await connection.close();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

app.post("/getwatchmovie", async (req, res) => {
  try {
    const items = {
      username: req.body.username,
    };

    const connection = await oracledb.getConnection(dbconfig);

    const query = `SELECT M.*,F.WATCH_TIME
                      FROM MOVIE M
                      JOIN WATCH_LIST F ON (M.MOVIE_ID=F.MOVIE_ID)
                      WHERE USER_ID=(SELECT USER_ID FROM USERS WHERE USER_NAME=:username)`;

    const result = await connection.execute(query, items, { autoCommit: true });

    console.log("here iswatch ");
    res.json({
      success: true,
      message: "Review delete successfully",
      result: result,
    });
    //res.json({ success: true , message: "login successfully added", result: result });
    await connection.close();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

app.post("/getissubscribed", async (req, res) => {
  try {
    const username = req.body.username;
    console.log("int the watch");
    const connection = await oracledb.getConnection(dbconfig);
    // const query = `SELECT* FROM "TESTPROJECT"."PERSONS" WHERE "NAME" ='${name}'`;

    const result = await connection.execute(
      `DECLARE
                                      C VARCHAR2(100);
                                      BEGIN
                                       C:= IS_SUBSCRIBED(:username);
                                       
                                        :title :=C;
                                      END;`,
      {
        username: username,
        title: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
      }
    );
    console.log(result.outBinds.title);
    console.log("here is sub");
    console.log(username);
    let num = parseInt(result.outBinds.title);
    if (num === 1) {
      res.json({ message: "watch list have it", answer: true });
    } else {
      res.json({ message: "watch list have it", answer: false });
    }

    await connection.close();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

app.post("/makesubscribe", async (req, res) => {
  try {
    const items = {
      username: req.body.username,
    };

    const connection = await oracledb.getConnection(dbconfig);

    const query = `DECLARE
                      BEGIN
                      UPDATE_VALIDITY( :username);
                      END;`;

    const result = await connection.execute(query, items, { autoCommit: true });

    console.log("succcsess");
    res.json({ success: true, message: "Review delete successfully" });
    //res.json({ success: true , message: "login successfully added", result: result });
    await connection.close();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

app.post("/adminlogin", async (req, res) => {
  try {
    const values = {
      username: String(req.body.username),
      password: String(req.body.password),
      // Add other properties as needed
    };
    const name = values.username;
    const password = values.password;
    const connection = await oracledb.getConnection(dbconfig);
    // const query = `SELECT* FROM "TESTPROJECT"."PERSONS" WHERE "NAME" ='${name}'`;

    const result = await connection.execute(
      `SELECT* FROM "TESTPROJECT"."USERS" WHERE "USER_NAME" ='${name}' AND "PASSWORD"='${password}'`
    );

    //res.json({ success: true , message: "login successfully added", result: result });

    if (
      result.rows.length > 0 &&
      values.username === "ADMIN" &&
      values.password === "99999"
    ) {
      res.json({
        success: true,
        message: "Login successful",
        result: result.rows,
      });
    } else {
      res.json({ success: false, message: "No user found with that name" });
    }
    await connection.close();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

app.post("/deleteforadmin", async (req, res) => {
  try {
    const items = {
      id: String(req.body.id),
    };
    const id= req.body.id;

    const connection = await oracledb.getConnection(dbconfig);

    const query = `DECLARE
                      X VARCHAR2(20);
                      BEGIN
                      X:=DELETE_MOVIE(:id);
                      END;`;

    const result = await connection.execute(query, items, { autoCommit: true });

    console.log("succcsess");
    res.json({ success: true, message: "movie delete successfully" });
    //res.json({ success: true , message: "login successfully added", result: result });
    const logquery = `DECLARE
                      BEGIN
                        RECORD_LOG(:username, :functname, :param);
                      END;`;
            const logvalues = {
            username: String("ADMIN"),
            functname: "DELETE_MOVIE",
            param: String(id)
            };
            const resultlog = await connection.execute(logquery, logvalues, {
            autoCommit: true,
            });


    await connection.close();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

app.post("/getIdlogs", async (req, res) => {
  try {
    const items = {
      id: String(req.body.id),
    };

    const connection = await oracledb.getConnection(dbconfig);

    const query = `SELECT * 
    FROM LOG_TABLE
    MINUS
    SELECT * 
    FROM LOG_TABLE
    WHERE USER_ID<> :id `;

    const result = await connection.execute(query, items, { autoCommit: true });

    console.log("succcsess");
    res.json({ success: true, message: "log got", result: result });
    //res.json({ success: true , message: "login successfully added", result: result });
    await connection.close();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

app.post("/getallLogs", async (req, res) => {
  try {

    const connection = await oracledb.getConnection(dbconfig);

    const query = `SELECT * FROM LOG_TABLE ORDER BY TIME DESC `;

    const result = await connection.execute(query);

    console.log("succcsess");
    res.json({ success: true, message: "log got", result: result });
    //res.json({ success: true , message: "login successfully added", result: result });
    await connection.close();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

app.post("/isusersubs", async (req, res) => {
  try {
    const username = req.body.username;
    
    const connection = await oracledb.getConnection(dbconfig);
    // const query = `SELECT* FROM "TESTPROJECT"."PERSONS" WHERE "NAME" ='${name}'`;

    const result = await connection.execute(
                                     `DECLARE
                                        C VARCHAR2(100);
                                      BEGIN
                                       C:= IS_SUBSCRIBED(:username);
                                        :title :=C;
                                      END;`,
      {
        username: username,
        title: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
      }
    );

    let num = parseInt(result.outBinds.title);
    if (num === 1) {
      res.json({ message: "subcribed it", answer: true });
    } else {
      res.json({ message: "not subcribed have it", answer: false });
    }

    await connection.close();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

app.post("/gethalls", async (req, res) => {
  try {
    const id = req.body.id;
    
    const connection = await oracledb.getConnection(dbconfig);
    // const query = `SELECT* FROM "TESTPROJECT"."PERSONS" WHERE "NAME" ='${name}'`;

    const result = await connection.execute(
                                     `SELECT S.START_TIME,S.SHOW_DATE,H.HALL_NAME,H.HALL_WEBSITE,H.LOCATION
                                     FROM HALLS H JOIN HALL_SHOW HS ON (H.HALL_ID= HS.HALL_ID)
                                     JOIN SHOWS S ON (S.SHOW_ID=HS.SHOW_ID)
                                     WHERE HS.MOVIE_ID= :id
                                     MINUS
                                     (SELECT S.START_TIME,S.SHOW_DATE,H.HALL_NAME,H.HALL_WEBSITE,H.LOCATION
                                     FROM HALLS H JOIN HALL_SHOW HS ON (H.HALL_ID= HS.HALL_ID)
                                     JOIN SHOWS S ON (S.SHOW_ID=HS.SHOW_ID)
                                     WHERE HS.MOVIE_ID=:id AND S.SHOW_DATE<SYSDATE)`,
      {
        id: id
      }
    );
    
      const result2 = await connection.execute(
                            `SELECT TITLE
                            FROM MOVIE
                            WHERE MOVIE_ID=:id`,
                      {
                      id: id
                      }
                      );
    
      res.json({ message: "hall result ", success: true, result: result, moviename: result2 });
    

    await connection.close();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});
