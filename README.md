# spring-web-service-project


Bienvenue sur notre projet de technologies-web.

Le serveur a été développé avec le framework spring boot et le client avec la bibliothèque de Facebook, React.


Pour plus d'informations sur les différentes fonctionnalités, veuillez vous réferrez au rapport, qui est au format pdf.

Le code source du serveur se situe dans le dossier /src/main/java du projet.

Le code source du client se situe dans le dossier /src/main/react-app du projet.

# installation
Afin de lancer la BDD, veuillez vous situer dans le dossier ou se trouve le fichier hsqldb.jar et lancer la commande :
java -cp hsqldb.jar org.hsqldb.server.Server --database.0 file:mydb --dbname.0 chatapp


Afin de pouvoir utiliser l'application il vous faudra télécharger les dépendances du serveur listées dans le fichier pom.xml, grâce à Maven

Il vous faudra aussi utiliser la commande 
### `npm install`
tout en vous situant dans le dossier /src/main/react-app

# utilisation
Lorsque que vous arriverez sur la page d'authentification, il vous sera possible de créer un compte ou de vous authentifier. Il vous faudra alors créer un compte (voir plusieurs si vous souhaiter profiter pleinement de la fonctionnalité de messagerie instantannée). Suite à cela, vous pourrez cliquer sur l'onglet des rooms. Créer une room et commencer à discuter avec vos amis.

# pour aller plus loin
Ce genre d'application pourrait se commercialiser puisque l'api permettrait a différentes applications d'obtenir une fonctionnalité de messagerie instantannée sans pour autant s'attarder sur le back-end.
