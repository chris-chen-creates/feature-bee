# god integration testing the worst
mysql -u root -e "DROP DATABASE IF EXISTS feature_bee_test"
mysql -u root -e "CREATE DATABASE feature_bee_test"

goose -dir ../db/migrations mysql "root@/feature_bee_test" up
