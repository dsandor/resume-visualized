# WCF
I started using WCF when it was evolving out of XML-RPC and SOAP SUDS libraries.  The technology was eventually named WCF.  From the time I started using WCF every application I built used WCF for the data layer connection point.  All apps fetched data through a WCF endpoint.

#### Projects
* `Every Project` - Basically every project from 2007 onward used WCF.

* `Authorization Header` - Created a client side and server side component that was injected inside the WCF pipeline to provide seamless authorization for requests.

* `WCF DMZ Proxy Router` - This product provided a small proxy stub to be installed in a DMZ location.  This code would reverse proxy WCF requests and provide authorization checks before routing to the backend server.  Routing worked by client version number so multiple simultaneous client versions would work at the same time and be services by the correct instances of the backend servers.  Now we have NGiNX to do this for us.

* `WCF Endpoint Discovery` - Microsoft's DISCO did not work very well and required maintenance.  I wrote some WCF attributes that when properly decorating code would make the endpoints discoverable.  Coupling this with the DMZ Proxy Router code allowed developers to publish new contracts that were automatically discovered and configured for presentation to the clients.  No more web.config hell.
