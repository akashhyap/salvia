import { useEffect } from 'react';

//@ts-ignore
const DisqusComments = ({ story }) => {

  useEffect(() => {
    const DISQUS_SCRIPT = 'disqus_script';
    const sd = document.getElementById(DISQUS_SCRIPT);
    if (!sd) {
      var disqus_config = function() {
        //@ts-ignore
        this.page.url = window.location.href;
        //@ts-ignore
        this.page.identifier = story.id;
      };
      var d = document, s = d.createElement('script');
      s.src = `https://${process.env.NEXT_PUBLIC_DISQUS_SHORTNAME}.disqus.com/embed.js`;
      s.id = DISQUS_SCRIPT;
      s.async = true;
      //@ts-ignore
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
    } else {
        //@ts-ignore
      window.DISQUS.reset({
        reload: true,
        //@ts-ignore
        config: disqus_config,
      });
    }
  }, []);
  return (
    <div id="disqus_thread"></div>
  );
};

export default DisqusComments;
