
            @render('views:partials/pagination.php', compact('pagination'))
@foreach($posts as $post)
            <article class="excerpt">
                @if(!empty($post['title']))
                <h3><a href="@base($pagination['slug'].'/'. ($post[mp()->slugName] ?? $post['_id']))">{{{ $post['title'] }}}</a></h3>
                @endif

                @render('views:partials/posts-meta.php', compact('post'))

                @render('views:partials/featured-media.php', ['page' => $post, 'mode' => 'image', 'format' => 'thumbnail'])

                @if(!empty($post['excerpt']))
                {{ $post['excerpt'] }}
                @elseif(!empty($post['content']))
                @render('views:partials/content.php', ['content' => $post['content']])
                @endif

                <p class="read_more"><a href="@base($pagination['slug'].'/'. ($post[mp()->slugName] ?? $post['_id']))">@lang('read more...')</a></p>

            </article>
@endforeach
            @render('views:partials/pagination.php', compact('pagination'))
