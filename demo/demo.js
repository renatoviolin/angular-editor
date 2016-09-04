'use strict';

angular.module('demo', ['angular-medium-editor'])

.controller('demo', function($scope, HTTPSendService, ) {

   $scope.dados = {
      "id": '',
      "titulo": 'Digite o titulo',
      "conteudo": 'Digite aqui o texto'
   }

   $scope.grid = {};

   function carregarGrid() {
      var musicas = [];
      HTTPSendService.buscar_musicas().then(function(res) {
         // console.log(res);
         for (var i = 0; i < res.data.length; i++) {
            musicas.push(res.data[i]);
         }
         $scope.grid.musicas = musicas;
      }).catch(function(err) {
         console.log(err);
      })
   }

   carregarGrid();

   $scope.btn_gravar = function() {
      HTTPSendService.gravar_mensagem_banco($scope.dados).then(function(res) {
         console.log(res);
         carregarGrid();
      }).catch(function(err) {
         alert("Falhou ao gravar no banco");
         console.log(err);
      })
   }

   $scope.btn_remover = function(id) {
      HTTPSendService.remover_musica(id).then(function(res) {
         console.log(res);
         carregarGrid();
      }).catch(function(err) {
         alert("Falhou ao gravar no banco");
         console.log(err);
      })
   }

   $scope.btn_carregar = function(id) {
      HTTPSendService.carregar_musica(id).then(function(res) {
         $scope.dados = res.data;
         console.log($scope.dados);
      }).catch(function(err) {
         alert("Falhou ao carregar dados");
         console.log(err);
      })
   }

   $scope.btn_novo = function() {
      $scope.dados = {
         "id": '',
         "titulo": 'Digite o titulo',
         "conteudo": 'Digite aqui o texto'
      }
   }

})

.factory('HTTPSendService', function($http) {
   var host = 'https://nodedb-partitura.herokuapp.com';
   return {
      gravar_mensagem_banco: function(dados) {

         if (dados.id === '') {
            dados.id = undefined;
            var req = {
               method: 'POST',
               url: host + '/partitura',
               headers: {
                  'Content-Type': 'application/json'
               },
               data: dados
            };
         } else {
            var req = {
               method: 'PUT',
               url: host + '/partitura',
               headers: {
                  'Content-Type': 'application/json'
               },
               data: dados
            };
         }
         return $http(req);
      },

      carregar_musica: function(id) {
         var req = {
            method: 'GET',
            url: host + '/partitura/' + id,
            headers: {
               'Content-Type': 'application/json; charset=utf-8'
            },
         };
         return $http(req);
      },

      buscar_musicas: function() {
         var req = {
            method: 'GET',
            url: host + '/partitura',
            headers: {
               'Content-Type': 'application/json; charset=utf-8'
            },
         };
         return $http(req);
      },

      remover_musica: function(id) {
         var req = {
            method: 'DELETE',
            url: host + '/partitura/' + id,
            headers: {
               'Content-Type': 'application/json; charset=utf-8'
            },
         };
         return $http(req);
      },
   }
})
