function OptionsNav() {
    return (
        <nav class="navbar navbar-default navbar-fixed-top" id="options-nav">
        <div class="container-fluid sticky">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" onclick="$('.collapse').collapse('show')" aria-expanded="false">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
          </div>
      
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav navbar-right">
              <li><a href="index.html#home">Home</a></li>
              <li class="active"><a href="about.html">About Me</a></li>
              <li><a href="index.html#projects">Projects</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>
        </div>
      </nav>
    )
}
export default OptionsNav