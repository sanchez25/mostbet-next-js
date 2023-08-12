import Link from 'next/link'

export default function Sidebar(){
    return (
        <>
            <div className="sidebar">
                <Link href="/admin/options"><span class="material-icons">settings_suggest</span>Опции</Link>
                <Link href="/admin/pages"><span class="material-icons">article</span>Страницы</Link>
                <Link href="/admin/add-page"><span class="material-icons">post_add</span>Создать страницу</Link>
                <Link href="/admin/categories"><span class="material-icons">translate</span>Языки</Link>
                <Link href="/admin/add-category"><span class="material-icons">language</span>Добавить язык</Link>
                <Link href="/admin/media-library"><span class="material-icons">perm_media</span>Медиабиблиотека</Link>
                <Link href="/admin/all-menus"><span class="material-icons">menu</span>Все меню</Link>
                <Link href="/admin/add-menu"><span class="material-icons">menu_open</span>Добавить меню</Link>
                <Link href="/admin/page-bundles"><span class="material-icons">sync_alt</span>Связки страниц</Link>
                <Link href="/admin/banners"><span class="material-icons">crop_original</span>Баннеры</Link>
                <Link href="/admin/add-banner"><span class="material-icons">ad_units</span>Добавить баннер</Link>
                <Link href="/admin/sidebars"><span class="material-icons">view_sidebar</span>Сайдбары</Link>
                <Link href="/admin/add-sidebar"><span class="material-icons">add_box</span>Добавить сайдбар</Link>
                <Link href="/admin/buttons"><span class="material-icons">dialpad</span>Кнопки</Link>
                <Link href="/admin/add-buttons"><span class="material-icons">radio_button_checked</span>Добавить кнопки</Link>
            </div>
        </>
    )
}


