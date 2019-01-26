echo "Empezando deploy"
echo "-- Haciendo gulp build"

gulp serve-build --production

echo "-- Eliminando antiguos archivos"
ssh admin.yeipii.com "rm -r /home/ubuntu/admin/admin/ui-admin/build" 

echo "-- Copiando nuevos archivos"
scp -r build admin.yeipii.com:/home/ubuntu/admin/admin/ui-admin

echo "Fin del deploy"