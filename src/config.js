
Jet.use(
    // 'render-time',
    'router', 
    'res', 
    'module', 
    'tool',
    'jui',
    'css-config',
    //'babel','less',
    //'css-config', 'valid','lang', jui
    function(){
        // Jet.lang.use(['cn','en']);
        Jet.res.define({
          js:{
            bg:'bg'
          },
          html:{
            fixBtn:'comp/fixBtn',
            copy:'comp/copy',
          }
        })
        Jet.router.use({
          history:false,
          index:'/',
          trueBase:false,
          router:{
            '/':'/index',
            '/index':'/index',
            '/play':'/play',
            '/net':'/net',
            '/search':'/search',
            // '/mark':'/mark'
          }
        });
    }
)
