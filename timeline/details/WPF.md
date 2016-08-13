# WPF
When WPF was first introduced I hated it with a passion.  You could not drag and drop a button on a design surface.  Instead you had to actually build the button from shapes and then make them clickable.  It was a very new technology with not a lot of structure.

Things progressed and we got components.  XAML became my best friend and I could crack out a highly maintainable MVVM style WPF app in no time at all.

If I built less than 100 WPF apps I would be surprised, so below is the largest app I built which covers anything you would ever want to do with WPF.

#### Projects
* `Fund Accounting` - This is a massive application with over 140 individual projects in the build server's soulution file.  Because there are so many different aspects to this UI I spent a good amount of time researching a modular design with MVVM.  
	* **Container** - Originally I used the Unity container then HaveBox, MEF, and eventually LightInject.
	* **Local Event Bus** - Local events were dispatched to a Prism Event Aggregator.
	* **Global Event Bus** - Some events were candidates to be shared with servers and other clients.  These Global Events were dispatched to a SignalR service.
	* **Modules** - Module discovery took place at startup and searched a local path for assemblies that provided Views and Controllers to the application.  Special attriburtes on the Views and controllers told the application how to access the view and inserted the view into the approriate menu control.  
	* **Data Layer** - One rule was enforced mercilessly; data was always fetched over http.  Originally this was over WCF services using XML.  I later retooled this to use ASP.NET MCV WebApi for RESTful(ish) JSON endpoints which increased performance while reducing server load.  Now the application hits NodeJS (true) REST service endpoints and the server side is broken out into micro services so the backend becomes as modular as the front end.
	* **Controls & Components** - Of the 1 Million line+ application, only two third party controls were used; a Telerik Diagram Control and a Window Manager.  I did not choose to write everything from scratch because of ego, it was because most controls kind of / sort of worked but not that well, or they did not exist at all for the visualization our userbase wanted.  UX was important and the visualizations are UX groundbreaking.  It's hard to break ground with some visualization that 1,000 other companies are dumping out on the market as well.

	
Because of the modular design we could break up the View work across many developers.  Their scope of responsibility was at the assembly level where their View and Controller existed.  At build time we would assembble all of the views into a folder for discovery by the client app.
	
	 