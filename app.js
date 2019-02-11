/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const express = require('express');

const app = express();
const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const AuthorizationV1 = require('watson-developer-cloud/authorization/v1');

// Bootstrap application settings
require('./config/express')(app);

// Create the token manager

const serviceUrl = 'https://stream.watsonplatform.net/speech-to-text/api';


const speechService = new SpeechToTextV1({
  username: 'b2093fad-6635-402d-b962-77b7666a06db',
  password: '7K4Sgy4d2W0K',
  url: serviceUrl,
});
const tokenManager = new AuthorizationV1(speechService.getCredentials());

app.get('/', (req, res) => res.render('index'));

// Get credentials using your credentials
app.get('/api/credentials', (req, res, next) => {
  tokenManager.getToken((err, token) => {
    if (err) {
      next(err);
    } else {
      const credentials = {
        token,
        serviceUrl,
      };
      res.json(credentials);
    }
  });
});

module.exports = app;
