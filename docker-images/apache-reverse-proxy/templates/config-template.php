<?php
    $ip_static = getenv('STATIC_APP');
    $ip_dynamic = getenv('DYNAMIC_APP');
?>

<VirtualHost *:80>
        ServerName demo.res.ch
		
		ProxyPass '/api/animals/' 'http://<?php print "$ip_dynamic"?>/'
        ProxyPassReverse '/api/animals/' 'http://<?php print "$ip_dynamic"?>/'

        ProxyPass "/" "http://<?php print "$ip_static"?>/"
        ProxyPassReverse "/" "http://<?php print "$ip_static"?>/"

</VirtualHost>