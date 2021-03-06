<?php
// default view, if the current collection's name is "posts"
?>

        <main id="main">
            @render('views:partials/featured-media.php', ['page' => $page, 'mode' => 'image', 'format' => 'headerimage'])

            <h2>{{{ $page['title'] }}}</h2>

            @render('views:partials/posts-meta.php', ['post' => $page])

            {{ $page['content'] }}

          @if(!empty($page['gallery']))
            @render('views:partials/gallery.php', compact('page'))
          @endif
          @if(!empty($page['video']))
            @render('views:partials/video.php', ['video' => $page['video']])
          @endif
          @if (!empty($posts))
            @render('views:partials/posts.php', ['posts' => $posts['posts'], 'pagination' => $posts['pagination']])
          @endif
        </main>
