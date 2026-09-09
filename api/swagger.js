const spec = {
  openapi: "3.0.0",
  info: {
    title: "API progetto",
    version: "1.0.0",
  },
  servers: [{ url: "http://localhost:5000" }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [{ bearerAuth: [] }],
  paths: {
    "/user/register": {
      post: {
        tags: ["utente"],
        security: [],
        summary: "Crea account (password hashata con bcrypt)",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: { type: "string" },
                  email: { type: "string" },
                  password: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "ok" },
          400: { description: "email gia usata" },
        },
      },
    },
    "/user/login": {
      post: {
        tags: ["utente"],
        security: [],
        summary: "Login, torna token e refreshToken",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  password: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "{ success, token, refreshToken, user }" },
          400: { description: "credenziali sbagliate (o utente solo google, senza password)" },
        },
      },
    },
    "/user/auth/google": {
      get: {
        tags: ["utente"],
        security: [],
        summary: "Redirect a Google, non chiamarla da qui in Try it out",
        responses: { 302: { description: "vai su accounts.google.com" } },
      },
    },
    "/user/auth/google/callback": {
      get: {
        tags: ["utente"],
        security: [],
        summary: "Google torna qua, noi mandiamo il frontend su /oauth-callback?token=...",
        responses: { 302: { description: "redirect a localhost:3000" } },
      },
    },
    "/user/refresh-token": {
      post: {
        tags: ["utente"],
        security: [],
        summary: "Access token nuovo dal refresh",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: { refreshToken: { type: "string" } },
              },
            },
          },
        },
        responses: { 200: { description: "{ token }" } },
      },
    },
    "/user/logout": {
      post: {
        tags: ["utente"],
        security: [],
        summary: "Mette refreshToken a null sul user",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: { refreshToken: { type: "string" } },
              },
            },
          },
        },
        responses: { 200: { description: "ok" } },
      },
    },
    "/user/checkandget": {
      get: {
        tags: ["utente"],
        summary: "Chi e' loggato, dal JWT (senza password)",
        responses: { 200: { description: "user" } },
      },
    },
    "/user/userData/{id}": {
      get: {
        tags: ["utente"],
        summary: "Profilo di qualcuno",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "user" }, 404: { description: "non esiste" } },
      },
    },
    "/user/search/{query}": {
      get: {
        tags: ["utente"],
        summary: "Search username (regex, escape sui caratteri strani)",
        parameters: [{ name: "query", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "array users" } },
      },
    },
    "/user/updateUserImage": {
      put: {
        tags: ["utente"],
        summary: "Foto profilo, campo file: img + username nel form (multer)",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  username: { type: "string" },
                  img: { type: "string", format: "binary" },
                },
              },
            },
          },
        },
        responses: { 200: { description: "immagine aggiornata" } },
      },
    },
    "/user/updateUserBio": {
      patch: {
        tags: ["utente"],
        summary: "Bio max 150",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: { bio: { type: "string" } },
              },
            },
          },
        },
        responses: { 200: { description: "user" } },
      },
    },
    "/user/follow/{id}": {
      patch: {
        tags: ["utente"],
        summary: "Toggle follow (stessa route per seguire e smettere)",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "target user" } },
      },
    },

    "/post/getPosts": {
      get: {
        tags: ["post"],
        summary: "Feed post",
        responses: { 200: { description: "data = lista post con author" } },
      },
    },
    "/post/getPostsofUser/{userId}": {
      get: {
        tags: ["post"],
        summary: "Post di un profilo",
        parameters: [{ name: "userId", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "ok" }, 400: { description: "userId sbagliato" } },
      },
    },
    "/post/addPost": {
      post: {
        tags: ["post"],
        summary: "Nuovo post, multipart img + author + content",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  author: { type: "string" },
                  content: { type: "string" },
                  img: { type: "string", format: "binary" },
                },
              },
            },
          },
        },
        responses: { 200: { description: "post creato" } },
      },
    },
    "/post/delete/{id}": {
      delete: {
        tags: ["post"],
        summary: "Cancella post",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "ok" } },
      },
    },
    "/post/addLike": {
      post: {
        tags: ["post"],
        summary: "Like, body userId e postId (toggle)",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  userId: { type: "string" },
                  postId: { type: "string" },
                },
              },
            },
          },
        },
        responses: { 200: { description: "ok" } },
      },
    },
    "/post/getPostComments/{postId}": {
      get: {
        tags: ["post"],
        summary: "Commenti",
        parameters: [{ name: "postId", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "commenti" } },
      },
    },
    "/post/addPostComment": {
      post: {
        tags: ["post"],
        summary: "Commento, replyTo opzionale se e' una risposta",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  post: { type: "string" },
                  author: { type: "string" },
                  text: { type: "string" },
                  replyTo: { type: "string" },
                },
              },
            },
          },
        },
        responses: { 200: { description: "ok" } },
      },
    },

    "/stories/getStories/{id}": {
      get: {
        tags: ["storie"],
        summary: "Storie mie + following",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "grouped" } },
      },
    },
    "/stories/getStoriesOfUser/{id}": {
      get: {
        tags: ["storie"],
        summary: "Storie di un user (cerchio profilo)",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "lista" } },
      },
    },
    "/stories/addStory": {
      post: {
        tags: ["storie"],
        summary: "Upload, campo file (img o video)",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: { file: { type: "string", format: "binary" } },
              },
            },
          },
        },
        responses: { 200: { description: "creata" }, 400: { description: "niente file" } },
      },
    },
    "/stories/deleteStory/{storyId}": {
      delete: {
        tags: ["storie"],
        summary: "Delete storia (deve essere tua)",
        parameters: [{ name: "storyId", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "ok" } },
      },
    },

    "/chats/newChat": {
      post: {
        tags: ["chat"],
        summary: "Apri chat con targetUserId, se c'era gia la riusa",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: { targetUserId: { type: "string" } },
              },
            },
          },
        },
        responses: { 200: { description: "chat" } },
      },
    },
    "/chats/getChats": {
      get: {
        tags: ["chat"],
        summary: "Le mie chat (non quelle in hiddenFor), lastMessage + unreadCount",
        responses: { 200: { description: "array" } },
      },
    },
    "/chats/deleteChat": {
      delete: {
        tags: ["chat"],
        summary: "Non cancella dal db, mette l'user in hiddenFor",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: { id: { type: "string" } },
              },
            },
          },
        },
        responses: { 200: { description: "ok" } },
      },
    },
    "/chats/clearChat": {
      post: {
        tags: ["chat"],
        summary: "Nasconde i messaggi solo per me",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: { id: { type: "string" } },
              },
            },
          },
        },
        responses: { 200: { description: "ok" } },
      },
    },

    "/messages/getMessages": {
      get: {
        tags: ["chat"],
        summary: "Storico, query chatId",
        parameters: [{ name: "chatId", in: "query", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "messaggi" } },
      },
    },
    "/messages/newMessage": {
      post: {
        tags: ["chat"],
        summary: "Salva messaggio (nell'app l'invio vero passa da socket send_message)",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  chatId: { type: "string" },
                  message: { type: "string" },
                },
              },
            },
          },
        },
        responses: { 200: { description: "messaggio" } },
      },
    },
    "/messages/readMessages": {
      patch: {
        tags: ["chat"],
        summary: "Patch perche aggiorniamo i read, non creiamo niente",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: { chatId: { type: "string" } },
              },
            },
          },
        },
        responses: { 200: { description: "{ updated: true }" } },
      },
    },
    "/messages/deleteMessage": {
      delete: {
        tags: ["chat"],
        summary: "who=me (hiddenFor) oppure who=everyone (delete, solo se sei il sender)",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message_id: { type: "string" },
                  who: { type: "string" },
                },
              },
            },
          },
        },
        responses: { 200: { description: "ok" } },
      },
    },
  },
};

export default spec;
