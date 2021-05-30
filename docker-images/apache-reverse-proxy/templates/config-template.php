<?php
    $ip_static = getenv('STATIC_APP');
    $ip_static_1 = getenv('STATIC_APP1');
    $ip_dynamic = getenv('DYNAMIC_APP');
    $ip_dynamic_1 = getenv('DYNAMIC_APP1');
?>


<VirtualHost *:80>
        ServerName demo.res.ch
		<Proxy "balancer://cluster_appDynamic">
            BalancerMember "http://<?php print "$ip_dynamic"?>"
            BalancerMember "http://<?php print "$ip_dynamic_1"?>"
        </Proxy>

        Header add Set-Cookie "ROUTEID=.%{BALANCER_WORKER_ROUTE}e; path=/" env=BALANCER_ROUTE_CHANGED
        <Proxy "balancer://cluster_appStatic">
            BalancerMember "http://<?php print "$ip_static"?>" route=1
            BalancerMember "http://<?php print "$ip_static_1"?>" route=2
            ProxySet stickysession=ROUTEID
        </Proxy>

		ProxyPass '/api/animals/' 'balancer://cluster_appDynamic/'
        ProxyPassReverse '/api/animals/' 'balancer://cluster_appDynamic/'

        ProxyPass "/" "balancer://cluster_appStatic/"
        ProxyPassReverse "/" "balancer://cluster_appStatic/"

</VirtualHost>