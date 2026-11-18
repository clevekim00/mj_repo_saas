window.dashboardI18n = (() => {
  const rows = [
  [
    "저장소 대시보드",
    "Repository dashboard",
    "リポジトリダッシュボード",
    "Panel de repositorios",
    "仓库仪表板"
  ],
  [
    "GitHub 또는 GitLab.com 저장소의 커밋 활동과 사용 언어를 확인하세요.",
    "View commit activity and languages for GitHub or GitLab.com repositories.",
    "GitHub・GitLab.comのコミット活動と使用言語を確認できます。",
    "Consulta la actividad y los lenguajes de repositorios de GitHub o GitLab.com.",
    "查看 GitHub 或 GitLab.com 仓库的提交活动和编程语言。"
  ],
  [
    "GitHub 프로필 또는 저장소 URL",
    "GitHub profile or repository URL",
    "GitHubプロフィールまたはリポジトリURL",
    "URL del perfil o repositorio de GitHub",
    "GitHub 个人主页或仓库 URL"
  ],
  [
    "GitHub 프로필 또는 저장소 주소",
    "GitHub profile or repository URL",
    "GitHubプロフィールまたはリポジトリURL",
    "URL del perfil o repositorio de GitHub",
    "GitHub 个人主页或仓库 URL"
  ],
  [
    "저장소 추가",
    "Add repository",
    "リポジトリを追加",
    "Añadir repositorio",
    "添加仓库"
  ],
  [
    "GitHub 토큰 (선택)",
    "GitHub token (optional)",
    "GitHubトークン（任意）",
    "Token de GitHub (opcional)",
    "GitHub 令牌（可选）"
  ],
  [
    "토큰 발급 안내",
    "Token guide",
    "トークン発行ガイド",
    "Guía de tokens",
    "令牌指南"
  ],
  [
    "GitHub 토큰 발급 안내",
    "GitHub token guide",
    "GitHubトークン発行ガイド",
    "Guía de tokens de GitHub",
    "GitHub 令牌指南"
  ],
  [
    "닫기",
    "Close",
    "閉じる",
    "Cerrar",
    "关闭"
  ],
  [
    "저장",
    "Save",
    "保存",
    "Guardar",
    "保存"
  ],
  [
    "프로젝트 정보 편집",
    "Edit project information",
    "プロジェクト情報を編集",
    "Editar información del proyecto",
    "编辑项目信息"
  ],
  [
    "프로젝트 목적",
    "Project purpose",
    "プロジェクトの目的",
    "Objetivo del proyecto",
    "项目目标"
  ],
  [
    "프로젝트 설명",
    "Project description",
    "プロジェクトの説明",
    "Descripción del proyecto",
    "项目描述"
  ],
  [
    "프로젝트 상태",
    "Project status",
    "プロジェクトの状態",
    "Estado del proyecto",
    "项目状态"
  ],
  [
    "상태 선택",
    "Select status",
    "状態を選択",
    "Seleccionar estado",
    "选择状态"
  ],
  [
    "기획",
    "Planning",
    "企画",
    "Planificación",
    "规划"
  ],
  [
    "개발",
    "Development",
    "開発",
    "Desarrollo",
    "开发"
  ],
  [
    "테스트",
    "Testing",
    "テスト",
    "Pruebas",
    "测试"
  ],
  [
    "운영",
    "Live",
    "運用",
    "En producción",
    "运行"
  ],
  [
    "보류",
    "On hold",
    "保留",
    "En pausa",
    "暂停"
  ],
  [
    "미확인",
    "Unverified",
    "未確認",
    "Sin verificar",
    "未确认"
  ],
  [
    "공개 확인",
    "Public release verified",
    "公開確認済み",
    "Publicación verificada",
    "已确认公开"
  ],
  [
    "사용 언어",
    "Languages",
    "使用言語",
    "Lenguajes",
    "编程语言"
  ],
  [
    "주간 커밋",
    "Weekly commits",
    "週間コミット",
    "Commits semanales",
    "每周提交"
  ],
  [
    "프로젝트 흐름 · 상세",
    "Project flow · Details",
    "プロジェクトの流れ・詳細",
    "Flujo del proyecto · Detalles",
    "项目流程 · 详情"
  ],
  [
    "상세 통계 불러오기",
    "Load detailed statistics",
    "詳細統計を読み込む",
    "Cargar estadísticas detalladas",
    "加载详细统计"
  ],
  [
    "상세 통계를 조회하는 중…",
    "Loading detailed statistics…",
    "詳細統計を読み込み中…",
    "Cargando estadísticas detalladas…",
    "正在加载详细统计…"
  ],
  [
    "저장소를 조회하는 중…",
    "Loading repositories…",
    "リポジトリを読み込み中…",
    "Cargando repositorios…",
    "正在加载仓库…"
  ],
  [
    "조회할 수 있는 저장소가 없습니다.",
    "No accessible repositories found.",
    "アクセスできるリポジトリがありません。",
    "No se encontraron repositorios accesibles.",
    "未找到可访问的仓库。"
  ],
  [
    "저장소를 갱신했습니다.",
    "Repository updated.",
    "リポジトリを更新しました。",
    "Repositorio actualizado.",
    "仓库已更新。"
  ],
  [
    "저장소를 추가했습니다.",
    "Repository added.",
    "リポジトリを追加しました。",
    "Repositorio añadido.",
    "仓库已添加。"
  ],
  [
    "프로젝트 정보를 저장했습니다.",
    "Project information saved.",
    "プロジェクト情報を保存しました。",
    "Información del proyecto guardada.",
    "项目信息已保存。"
  ],
  [
    "서버 응답을 받지 못했습니다. 다시 시도해 주세요.",
    "No server response. Please retry.",
    "サーバーから応答がありません。再試行してください。",
    "El servidor no responde. Inténtalo de nuevo.",
    "服务器未响应，请重试。"
  ],
  [
    "저장소를 조회하지 못했습니다.",
    "Could not load the repository.",
    "リポジトリを取得できませんでした。",
    "No se pudo cargar el repositorio.",
    "无法加载仓库。"
  ],
  [
    "확대 보기",
    "Expand graph",
    "グラフを拡大",
    "Ampliar gráfico",
    "放大图谱"
  ],
  [
    "Graphify 확대 보기",
    "Expanded Graphify graph",
    "Graphifyグラフ拡大表示",
    "Gráfico Graphify ampliado",
    "Graphify 图谱放大视图"
  ],
  [
    "Graphify 코드 그래프",
    "Graphify code graph",
    "Graphifyコードグラフ",
    "Gráfico de código Graphify",
    "Graphify 代码图谱"
  ],
  [
    "다시 시도",
    "Retry",
    "再試行",
    "Reintentar",
    "重试"
  ],
  [
    "연결 확인",
    "Inspect connections",
    "接続を確認",
    "Inspeccionar conexiones",
    "查看连接"
  ],
  [
    "전체 노드",
    "All nodes",
    "すべてのノード",
    "Todos los nodos",
    "所有节点"
  ],
  [
    "Graphify 그래프를 불러오는 중이에요…",
    "Loading Graphify graph…",
    "Graphifyグラフを読み込み中…",
    "Cargando el gráfico Graphify…",
    "正在加载 Graphify 图谱…"
  ],
  [
    "원인을 확인할 수 없어요.",
    "The cause could not be determined.",
    "原因を特定できません。",
    "No se pudo determinar la causa.",
    "无法确定原因。"
  ],
  [
    "저장소 전체에서 일부 코드와 연결을 표시해요.",
    "Showing a subset of repository code and connections.",
    "リポジトリの一部のコードと接続を表示しています。",
    "Se muestra parte del código y las conexiones del repositorio.",
    "仅显示仓库的部分代码和连接。"
  ],
  [
    "실선은 함수 호출, 점선은 파일에 포함된 항목",
    "Solid lines: calls. Dotted lines: file contents.",
    "実線は関数呼び出し、点線はファイル内の項目です。",
    "Líneas continuas: llamadas. Punteadas: contenido de archivos.",
    "实线表示函数调用，虚线表示文件包含关系。"
  ],
  [
    "코드 노드와 연결",
    "Code nodes and connections",
    "コードノードと接続",
    "Nodos de código y conexiones",
    "代码节点和连接"
  ],
  [
    "내 프로젝트 대시보드",
    "My project dashboard",
    "マイプロジェクトダッシュボード",
    "Panel de mis proyectos",
    "我的项目仪表板"
  ],
  [
    "개인 워크스페이스",
    "Personal workspace",
    "個人ワークスペース",
    "Espacio de trabajo personal",
    "个人工作区"
  ],
  [
    "무엇을 만들고 있고, 어디까지 왔는지 한눈에.",
    "See what you are building and how far it has come.",
    "何を作り、どこまで進んだかをひと目で。",
    "Qué estás creando y cuánto has avanzado, de un vistazo.",
    "一目了然地查看项目目标与进展。"
  ],
  [
    "프로젝트",
    "Projects",
    "プロジェクト",
    "Proyectos",
    "项目"
  ],
  [
    "전체",
    "All",
    "すべて",
    "Todos",
    "全部"
  ],
  [
    "프로젝트 검색",
    "Search projects",
    "プロジェクト検索",
    "Buscar proyectos",
    "搜索项目"
  ],
  [
    "이름, 목적, 키워드",
    "Name, purpose, keywords",
    "名前・目的・キーワード",
    "Nombre, objetivo, palabras clave",
    "名称、目标、关键词"
  ],
  [
    "출시 상태",
    "Release status",
    "リリース状態",
    "Estado de publicación",
    "发布状态"
  ],
  [
    "GitHub 가져오기",
    "Import from GitHub",
    "GitHubから取り込む",
    "Importar de GitHub",
    "从 GitHub 导入"
  ],
  [
    "GitHub 저장소 가져오기",
    "Import GitHub repositories",
    "GitHubリポジトリを取り込む",
    "Importar repositorios de GitHub",
    "导入 GitHub 仓库"
  ],
  [
    "가져오기",
    "Import",
    "取り込む",
    "Importar",
    "导入"
  ],
  [
    "비공개 저장소",
    "Private repository",
    "非公開リポジトリ",
    "Repositorio privado",
    "私有仓库"
  ],
  [
    "비공개",
    "Private",
    "非公開",
    "Privado",
    "私有"
  ],
  [
    "버전 미확인",
    "Version unverified",
    "バージョン未確認",
    "Versión sin verificar",
    "版本未确认"
  ],
  [
    "저장소",
    "Repository",
    "リポジトリ",
    "Repositorio",
    "仓库"
  ],
  [
    "공개 페이지",
    "Public page",
    "公開ページ",
    "Página pública",
    "公开页面"
  ],
  [
    "링크 미확인",
    "Link unverified",
    "リンク未確認",
    "Enlace sin verificar",
    "链接未确认"
  ],
  [
    "조건에 맞는 프로젝트가 없어요.",
    "No projects match these filters.",
    "条件に一致するプロジェクトがありません。",
    "No hay proyectos que coincidan con los filtros.",
    "没有符合筛选条件的项目。"
  ],
  [
    "프로젝트 상세는 각 카드에서 펼칠 수 있어요.",
    "Expand a card to view project details.",
    "各カードを開くと詳細を確認できます。",
    "Despliega cada tarjeta para ver sus detalles.",
    "展开卡片即可查看项目详情。"
  ],
  [
    "공개 저장소와 제품 출시는 별개예요. 확인되지 않은 버전이나 출시는 따로 표시했어요.",
    "Public repositories and product releases are tracked separately. Unverified versions and releases are marked.",
    "公開リポジトリと製品リリースは別々に管理し、未確認のバージョンやリリースを明記しています。",
    "Se distinguen los repositorios públicos de los lanzamientos. Las versiones y publicaciones sin verificar están indicadas.",
    "公开仓库与产品发布分别记录，未确认的版本和发布会单独标注。"
  ],
  [
    "2026.11.14 기준 · 수동 정리",
    "Manually curated · Nov 14, 2026",
    "2026年11月14日時点・手動整理",
    "Revisión manual · 14 nov 2026",
    "截至 2026年11月14日 · 手动整理"
  ],
  [
    "GitHub 저장소를 조회하는 중이에요…",
    "Loading GitHub repositories…",
    "GitHubリポジトリを取得中…",
    "Cargando repositorios de GitHub…",
    "正在加载 GitHub 仓库…"
  ],
  [
    "가져올 수 있는 저장소가 없어요.",
    "No repositories available to import.",
    "取り込めるリポジトリがありません。",
    "No hay repositorios disponibles para importar.",
    "没有可导入的仓库。"
  ],
  [
    "GitHub 프로필 또는 저장소 주소를 입력해 주세요.",
    "Enter a GitHub profile or repository URL.",
    "GitHubプロフィールまたはリポジトリのURLを入力してください。",
    "Introduce la URL de un perfil o repositorio de GitHub.",
    "请输入 GitHub 个人主页或仓库 URL。"
  ],
  [
    "저장소 주소를 확인해 주세요.",
    "Check the repository URL.",
    "リポジトリURLを確認してください。",
    "Revisa la URL del repositorio.",
    "请检查仓库 URL。"
  ],
  [
    "GitHub 토큰 발급 페이지 (새 탭)",
    "Create a GitHub token (new tab)",
    "GitHubトークン発行（新しいタブ）",
    "Crear token de GitHub (nueva pestaña)",
    "创建 GitHub 令牌（新标签页）"
  ],
  [
    "공개 저장소는 토큰 없이 조회할 수 있습니다. 비공개 저장소를 조회하려면 앱이 GitHub에 읽기 권한을 증명할 수 있도록",
    "Public repositories need no token. To read private repositories, provide a",
    "公開リポジトリにはトークンは不要です。非公開リポジトリの読み取りには",
    "Los repositorios públicos no requieren token. Para leer repositorios privados, introduce un",
    "公开仓库无需令牌。要读取私有仓库，请输入"
  ],
  [
    "을 입력하세요.",
    "to authorize read access.",
    "を入力してください。",
    "para autorizar el acceso de lectura.",
    "以授权读取权限。"
  ],
  [
    "에서 토큰 이름과 만료일을 설정합니다.",
    "and set a token name and expiration date.",
    "でトークン名と有効期限を設定します。",
    "y define un nombre y una fecha de caducidad.",
    "并设置令牌名称和到期日期。"
  ],
  [
    "에서 저장소 소유 계정을 선택하고,",
    "select the repository owner, then under",
    "で所有者を選択し、",
    "selecciona al propietario y, en",
    "选择仓库所有者，然后在"
  ],
  [
    "에서 조회할 저장소를 선택합니다.",
    "select the repositories to read.",
    "で対象リポジトリを選択します。",
    "selecciona los repositorios que deseas consultar.",
    "选择要读取的仓库。"
  ],
  [
    "에",
    "under",
    "で",
    "en",
    "中"
  ],
  [
    "가 포함되어 있는지 확인합니다. 주간 커밋 통계나 Graphify 그래프도 보려면",
    "must be enabled. For weekly commit statistics or Graphify graphs, add",
    "を確認します。週間コミット統計やGraphifyグラフには",
    "debe estar habilitado. Para estadísticas semanales o gráficos Graphify, añade",
    "必须启用。要查看每周提交统计或 Graphify 图谱，请添加"
  ],
  [
    "를 추가합니다.",
    "permission.",
    "を追加します。",
    "como permiso.",
    "权限。"
  ],
  [
    "을 누르고 표시된 토큰을 복사해 GitHub 토큰 입력창에 붙여넣습니다.",
    "then copy the generated token into the GitHub token field.",
    "を押し、生成されたトークンを入力欄に貼り付けます。",
    "y copia el token generado en el campo de token de GitHub.",
    "然后复制生成的令牌并粘贴到 GitHub 令牌输入框。"
  ],
  [
    "공개 저장소는 토큰 없이 가져올 수 있어요. 비공개 저장소는 읽기 권한이 있는 토큰이 필요해요.",
    "Public repositories need no token. Private repositories require a token with read access.",
    "公開リポジトリにはトークンは不要です。非公開リポジトリには読み取り権限が必要です。",
    "Los repositorios públicos no requieren token. Los privados requieren un token con acceso de lectura.",
    "公开仓库无需令牌，私有仓库需要具有读取权限的令牌。"
  ],
  [
    "GitHub에서 Fine-grained personal access token 발급",
    "Create a fine-grained personal access token on GitHub",
    "GitHubでFine-grained personal access tokenを発行",
    "Crear un token de acceso personal detallado en GitHub",
    "在 GitHub 创建细粒度个人访问令牌"
  ],
  [
    "을 열어요.",
    "to get started.",
    "を開きます。",
    "para empezar.",
    "开始创建。"
  ],
  [
    "저장소의 소유 계정과 가져올 저장소를 선택하고",
    "Select the repository owner and repositories, then check",
    "所有者と対象リポジトリを選び、",
    "Selecciona al propietario y los repositorios, y comprueba",
    "选择仓库所有者和目标仓库，并确认"
  ],
  [
    "를 확인해요.",
    "permission.",
    "を確認します。",
    "como permiso.",
    "权限。"
  ],
  [
    "을 누르고 표시된 토큰을 이 창에 붙여넣어요.",
    "then paste the generated token here.",
    "を押し、生成されたトークンをここに貼り付けます。",
    "y pega aquí el token generado.",
    "然后将生成的令牌粘贴到此处。"
  ],
  [
    "로컬 아틀라스 서버에 연결할 수 없어요. 서버가 실행 중인지 확인해 주세요.",
    "Cannot connect to the local server. Check that it is running.",
    "ローカルサーバーに接続できません。起動を確認してください。",
    "No se puede conectar al servidor local. Comprueba que esté activo.",
    "无法连接本地服务器，请确认服务器正在运行。"
  ],
  [
    "GitHub 조회 한도에 도달했어요. 잠시 후 다시 시도해 주세요.",
    "GitHub rate limit reached. Try again later.",
    "GitHubの取得上限に達しました。後ほど再試行してください。",
    "Se alcanzó el límite de GitHub. Inténtalo más tarde.",
    "已达到 GitHub 请求限制，请稍后重试。"
  ],
  [
    "GitHub 토큰이 유효하지 않거나 만료됐어요.",
    "The GitHub token is invalid or expired.",
    "GitHubトークンが無効または期限切れです。",
    "El token de GitHub no es válido o ha caducado.",
    "GitHub 令牌无效或已过期。"
  ],
  [
    "GitHub 주소와 토큰의 저장소 접근 권한을 확인해 주세요.",
    "Check the GitHub URL and token permissions.",
    "GitHubのURLとトークンの権限を確認してください。",
    "Revisa la URL de GitHub y los permisos del token.",
    "请检查 GitHub URL 和令牌访问权限。"
  ],
  [
    "브라우저 저장 공간을 사용할 수 없어 이번 페이지에서만 그래프를 유지해요.",
    "Browser storage is unavailable. The graph will last for this page only.",
    "ブラウザーに保存できないため、このページ内のみで保持します。",
    "El almacenamiento del navegador no está disponible. El gráfico solo se conserva en esta página.",
    "浏览器存储不可用，图谱仅在当前页面保留。"
  ],
  [
    "저장소에 분석할 코드가 없어요.",
    "The repository has no code to analyze.",
    "解析するコードがありません。",
    "El repositorio no contiene código para analizar.",
    "仓库没有可分析的代码。"
  ],
  [
    "분석할 수 있는 코드 파일이 없어요.",
    "No supported code files found.",
    "対応するコードファイルがありません。",
    "No se encontraron archivos de código compatibles.",
    "未找到支持的代码文件。"
  ],
  [
    "로컬 서버에서 Graphify CLI를 찾을 수 없어요.",
    "Graphify CLI was not found on the local server.",
    "ローカルサーバーにGraphify CLIが見つかりません。",
    "No se encontró Graphify CLI en el servidor local.",
    "本地服务器未找到 Graphify CLI。"
  ],
  [
    "로컬 Graphify 분석 시간이 초과됐어요.",
    "Local Graphify analysis timed out.",
    "ローカルGraphify解析がタイムアウトしました。",
    "El análisis local de Graphify agotó el tiempo de espera.",
    "本地 Graphify 分析超时。"
  ],
  [
    "로컬 Graphify CLI가 코드 분석 중 종료됐어요.",
    "Graphify CLI exited during code analysis.",
    "Graphify CLIがコード解析中に終了しました。",
    "Graphify CLI se cerró durante el análisis del código.",
    "Graphify CLI 在代码分析过程中退出。"
  ],
  [
    "Graphify가 코드에서 그래프 항목을 찾지 못했어요.",
    "Graphify found no graph nodes in the code.",
    "コード内にグラフ項目が見つかりません。",
    "Graphify no encontró nodos en el código.",
    "Graphify 未在代码中找到图谱节点。"
  ],
  [
    "주별 커밋 수. 좌우 방향키로 주를 이동할 수 있습니다.",
    "Weekly commits. Use the left and right arrow keys to navigate weeks.",
    "週別コミット数。左右の矢印キーで移動できます。",
    "Commits semanales. Usa las flechas izquierda y derecha para cambiar de semana.",
    "每周提交次数。使用左右方向键切换周。"
  ],
  [
    "현재 카드에 적용했습니다. 브라우저에 저장할 수 없습니다.",
    "Applied to this card. Browser storage is unavailable.",
    "カードに反映しましたが、ブラウザーには保存できません。",
    "Aplicado a esta tarjeta. No se puede guardar en el navegador.",
    "已应用到当前卡片，但无法保存到浏览器。"
  ],
  [
    "브라우저에 저장할 수 없어 이번 페이지에서만 변경 내용을 유지합니다.",
    "Changes are kept for this page only because browser storage is unavailable.",
    "保存できないため、変更はこのページ内のみで保持します。",
    "Los cambios solo se conservan en esta página porque el almacenamiento no está disponible.",
    "浏览器存储不可用，更改仅在当前页面保留。"
  ],
  [
    "브라우저에 저장할 수 없어 이번 페이지에서만 카드를 유지합니다.",
    "Cards are kept for this page only because browser storage is unavailable.",
    "保存できないため、カードはこのページ内のみで保持します。",
    "Las tarjetas solo se conservan en esta página porque el almacenamiento no está disponible.",
    "浏览器存储不可用，卡片仅在当前页面保留。"
  ],
  [
    "로컬 서버에서 Graphify 응답을 받지 못했어요. 최신 코드로 서버를 다시 시작해 주세요.",
    "No Graphify response. Restart the local server with the latest code.",
    "Graphifyの応答がありません。最新コードでサーバーを再起動してください。",
    "Graphify no responde. Reinicia el servidor local con el código actualizado.",
    "未收到 Graphify 响应，请使用最新代码重启本地服务器。"
  ],
  [
    "로컬 서버에서 읽을 수 있는 그래프 데이터를 받지 못했어요.",
    "The local server returned invalid graph data.",
    "ローカルサーバーから有効なグラフデータを取得できません。",
    "El servidor local devolvió datos de gráfico no válidos.",
    "本地服务器返回的图谱数据无效。"
  ],
  [
    "GitHub 소스 파일을 가져오는 데 시간이 너무 오래 걸렸어요.",
    "Fetching GitHub source files timed out.",
    "GitHubソースの取得がタイムアウトしました。",
    "La descarga de archivos de GitHub agotó el tiempo de espera.",
    "获取 GitHub 源文件超时。"
  ],
  [
    "로컬 서버에서 GitHub API에 연결할 수 없어요. 네트워크를 확인해 주세요.",
    "The local server cannot connect to GitHub API. Check the network.",
    "GitHub APIに接続できません。ネットワークを確認してください。",
    "El servidor local no puede conectar con la API de GitHub. Revisa la red.",
    "本地服务器无法连接 GitHub API，请检查网络。"
  ],
  [
    "GitHub가 코드 조회를 거부했어요. 토큰의 Contents 읽기 권한을 확인해 주세요.",
    "GitHub denied code access. Check the token's Contents read permission.",
    "GitHubがコードへのアクセスを拒否しました。Contents読み取り権限を確認してください。",
    "GitHub denegó el acceso al código. Revisa el permiso de lectura de Contents del token.",
    "GitHub 拒绝代码访问，请检查令牌的 Contents 读取权限。"
  ],
  [
    "GitHub에서 저장소를 찾을 수 없어요. 주소를 확인하고, 비공개 저장소는 읽기 토큰으로 다시 가져와 주세요.",
    "Repository not found. Check the URL and import private repositories again with a read token.",
    "リポジトリが見つかりません。URLを確認し、非公開の場合は読み取りトークンで再度取り込んでください。",
    "Repositorio no encontrado. Revisa la URL e importa los privados de nuevo con un token de lectura.",
    "未找到仓库。请检查 URL，私有仓库请使用读取令牌重新导入。"
  ],
  [
    "소스 파일이 너무 커요.",
    "The source file is too large.",
    "ソースファイルが大きすぎます。",
    "El archivo de código es demasiado grande.",
    "源文件过大。"
  ],
  [
    "공개 저장소를 찾을 수 없습니다.",
    "Public repository not found.",
    "公開リポジトリが見つかりません。",
    "No se encontró el repositorio público.",
    "未找到公开仓库。"
  ],
  [
    "다른 그래프를 생성 중이에요. 잠시 뒤 다시 시도해 주세요.",
    "Other graphs are being generated. Try again shortly.",
    "他のグラフを生成中です。しばらくして再試行してください。",
    "Se están generando otros gráficos. Inténtalo en un momento.",
    "正在生成其他图谱，请稍后重试。"
  ],
  [
    "그래프를 생성하지 못했어요. 잠시 뒤 다시 시도해 주세요.",
    "Could not generate the graph. Please retry.",
    "グラフを生成できません。再試行してください。",
    "No se pudo generar el gráfico. Inténtalo de nuevo.",
    "无法生成图谱，请重试。"
  ],
  [
    "GitHub 프로필 또는 GitHub·GitLab.com 저장소 URL을 입력해 주세요.",
    "Enter a GitHub profile or a GitHub/GitLab.com repository URL.",
    "GitHubプロフィールまたはGitHub・GitLab.comリポジトリURLを入力してください。",
    "Introduce un perfil de GitHub o una URL de repositorio de GitHub/GitLab.com.",
    "请输入 GitHub 个人主页或 GitHub/GitLab.com 仓库 URL。"
  ],
  [
    "개별 GitHub 저장소 주소가 필요해요.",
    "An individual GitHub repository URL is required.",
    "個別のGitHubリポジトリURLが必要です。",
    "Se requiere la URL de un repositorio de GitHub.",
    "需要具体的 GitHub 仓库 URL。"
  ],
  [
    "아틀라스 페이지에서 그래프를 요청해 주세요.",
    "Request the graph from the dashboard page.",
    "ダッシュボードからグラフを要求してください。",
    "Solicita el gráfico desde el panel.",
    "请从仪表板页面请求图谱。"
  ],
  [
    "저장소 정보를 가져오지 못했습니다. 다시 시도해 주세요.",
    "Could not load the repository.",
    "リポジトリを取得できませんでした。",
    "No se pudo cargar el repositorio.",
    "无法加载仓库。"
  ],
  [
    "GitHub에 연결하지 못했어요. 네트워크를 확인하고 다시 시도해 주세요.",
    "The local server cannot connect to GitHub API. Check the network.",
    "GitHub APIに接続できません。ネットワークを確認してください。",
    "El servidor local no puede conectar con la API de GitHub. Revisa la red.",
    "本地服务器无法连接 GitHub API，请检查网络。"
  ],
  [
    "GitHub에서 저장소 정보를 가져오지 못했어요.",
    "Could not load the repository.",
    "リポジトリを取得できませんでした。",
    "No se pudo cargar el repositorio.",
    "无法加载仓库。"
  ],
  [
    "GitHub에서 소스 파일을 가져오지 못했어요.",
    "Could not load the repository.",
    "リポジトリを取得できませんでした。",
    "No se pudo cargar el repositorio.",
    "无法加载仓库。"
  ],
  [
    "소스 파일을 읽을 수 없어요.",
    "Could not load the repository.",
    "リポジトリを取得できませんでした。",
    "No se pudo cargar el repositorio.",
    "无法加载仓库。"
  ],
  [
    "GitHub에서 코드에 접근할 수 없어요. 토큰의 Contents 읽기 권한을 확인해 주세요.",
    "GitHub denied code access. Check the token's Contents read permission.",
    "GitHubがコードへのアクセスを拒否しました。Contents読み取り権限を確認してください。",
    "GitHub denegó el acceso al código. Revisa el permiso de lectura de Contents del token.",
    "GitHub 拒绝代码访问，请检查令牌的 Contents 读取权限。"
  ],
  [
    "GitHub 토큰의 저장소 접근 권한을 확인해 주세요.",
    "Check the GitHub URL and token permissions.",
    "GitHubのURLとトークンの権限を確認してください。",
    "Revisa la URL de GitHub y los permisos del token.",
    "请检查 GitHub URL 和令牌访问权限。"
  ],
  [
    "GitHub 주소와 토큰에 허용된 저장소를 확인해 주세요.",
    "Check the GitHub URL and token permissions.",
    "GitHubのURLとトークンの権限を確認してください。",
    "Revisa la URL de GitHub y los permisos del token.",
    "请检查 GitHub URL 和令牌访问权限。"
  ],
  [
    "GitHub 토큰이 유효하지 않거나 만료됐어요. 새 토큰으로 저장소를 다시 가져와 주세요.",
    "The GitHub token is invalid or expired.",
    "GitHubトークンが無効または期限切れです。",
    "El token de GitHub no es válido o ha caducado.",
    "GitHub 令牌无效或已过期。"
  ],
  [
    "GitHub 토큰이 유효하지 않습니다. 토큰 값과 만료 여부를 확인해 주세요.",
    "The GitHub token is invalid or expired.",
    "GitHubトークンが無効または期限切れです。",
    "El token de GitHub no es válido o ha caducado.",
    "GitHub 令牌无效或已过期。"
  ],
  [
    "토큰이 유효하지 않거나 만료됐어요.",
    "The GitHub token is invalid or expired.",
    "GitHubトークンが無効または期限切れです。",
    "El token de GitHub no es válido o ha caducado.",
    "GitHub 令牌无效或已过期。"
  ]
];
  const languages = { ko: '한국어', en: 'English', ja: '日本語', es: 'Español', 'zh-CN': '简体中文' };
  let locale = 'ko';
  try { locale = localStorage.getItem('dashboard:language') || 'ko'; } catch {}
  if (!Object.hasOwn(languages, locale)) locale = 'ko';
  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();
  const dictionary = new Map(rows.map(row => [row[0], row]));
  const formats = [
    [/^저장소 (.+)개를 불러왔습니다\.$/, ['$1 repositories loaded.', '$1件のリポジトリを読み込みました。', 'Se cargaron $1 repositorios.', '已加载 $1 个仓库。']],
    [/^(.+)개 프로젝트$/, ['$1 projects', '$1件のプロジェクト', '$1 proyectos', '$1 个项目']],
    [/^노드 (.+)개 · 연결 (.+)개 · 분석 파일 (.+)개$/, ['$1 nodes · $2 edges · $3 files', '$1ノード・$2接続・$3ファイル', '$1 nodos · $2 conexiones · $3 archivos', '$1 个节点 · $2 条连接 · $3 个文件']],
    [/^노드 (.+)개 · 연결 (.+)개 · 그룹 (.+)개$/, ['$1 nodes · $2 edges · $3 groups', '$1ノード・$2接続・$3グループ', '$1 nodos · $2 conexiones · $3 grupos', '$1 个节点 · $2 条连接 · $3 个组']],
    [/^저장소 (.+)개를 확인했어요. 새 카드 (.+)개를 추가했어요\.$/, ['Checked $1 repositories. Added $2 cards.', '$1件を確認し、$2枚のカードを追加しました。', 'Se revisaron $1 repositorios y se añadieron $2 tarjetas.', '已检查 $1 个仓库，新增 $2 张卡片。']],
    [/^(.+) 시작 주 · 커밋 (.+)건$/, ['Week of $1 · $2 commits', '$1開始の週・$2コミット', 'Semana del $1 · $2 commits', '$1 开始的一周 · $2 次提交']],
  ];
  const index = () => ['en', 'ja', 'es', 'zh-CN'].indexOf(locale);
  function t(value) {
    if (locale === 'ko' || !value) return value;
    const exact = dictionary.get(value);
    if (exact) return exact[index() + 1];
    if (value.endsWith(' ↗')) return t(value.slice(0, -2)) + ' ↗';
    if (value.startsWith('상태 · ')) return ['Status', '状態', 'Estado', '状态'][index()] + ' · ' + t(value.slice(5));
    if (value.endsWith(' · 비공개')) return value.slice(0, -6) + ' · ' + t('비공개');
    if (value.startsWith('그래프 생성 실패 · ')) {
      return ['Graph generation failed', 'グラフ生成失敗', 'Error al generar el gráfico', '图谱生成失败'][index()] + ' · ' + t(value.slice('그래프 생성 실패 · '.length));
    }
    const http = /^(.*) (\(HTTP \d+\))$/.exec(value);
    if (http) return t(http[1]) + ' ' + http[2];
    for (const [pattern, replacements] of formats) {
      if (pattern.test(value)) return value.replace(pattern, replacements[index()]);
    }
    return value;
  }

  function t(text) {
    if (locale === 'ko' || !text) return text;
    const index = Object.keys(languages).indexOf(locale);
    const trimmed = text.trim();
    const row = dictionary.get(trimmed);
    if (row) return text.replace(trimmed, row[index]);
    for (const [pattern, translations] of formats) {
      if (pattern.test(trimmed)) return trimmed.replace(pattern, translations[index - 1]);
    }
    const failure = trimmed.match(/^그래프 생성 실패 · (.*)$/);
    if (failure) {
      const prefixes = ['Graph generation failed', 'グラフ生成失敗', 'Error al generar el gráfico', '图谱生成失败'];
      return prefixes[index - 1] + ' · ' + t(failure[1]);
    }
    const http = trimmed.match(/^(.*?) (\(HTTP \d+\))$/);
    if (http) return t(http[1]) + ' ' + http[2];
    const platform = trimmed.match(/^(GitHub|GitLab.com) · 비공개$/);
    if (platform) return platform[1] + ' · ' + t('비공개');
    const state = trimmed.match(/^상태 · (.*)$/);
    if (state) return t('프로젝트 상태') + ' · ' + t(state[1]);
    const link = trimmed.match(/^(저장소|공개 페이지) ↗$/);
    if (link) return t(link[1]) + ' ↗';
    const rate = trimmed.match(/^(GitHub|GitLab.com) 조회 한도에 도달했습니다. 잠시 후 다시 시도해 주세요.$/);
    if (rate) return t('GitHub 조회 한도에 도달했어요. 잠시 후 다시 시도해 주세요.').replace('GitHub', rate[1]);
    const missing = trimmed.match(/^(GitHub|GitLab.com)에서 공개 저장소를 찾을 수 없습니다. 주소와 저장소 공개 여부를 확인해 주세요.$/);
    if (missing) return missing[1] + ' · ' + t('공개 저장소를 찾을 수 없습니다.');
    const week = trimmed.match(/^(.*) 시작 주 · 커밋 (.*)건$/);
    if (week) {
      return [`Week of ${week[1]} · ${week[2]} commits`, `${week[1]}の週・${week[2]}コミット`,
        `Semana de ${week[1]} · ${week[2]} commits`, `${week[1]}当周 · ${week[2]} 次提交`][index - 1];
    }
    return text;
  }

  function translateNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.parentElement?.closest('[data-no-i18n],script,style,textarea')) return;
      const current = node.nodeValue;
      const previous = originalText.get(node);
      const source = previous && current === previous.rendered ? previous.source : current;
      const content = source.trim();
      const rendered = source.replace(content, () => t(content));
      originalText.set(node, { source, rendered });
      if (current !== rendered) node.nodeValue = rendered;
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE && node.nodeType !== Node.DOCUMENT_NODE) return;
    if (node.matches?.('script,style,[data-no-i18n]')) return;
    if (node.tagName === 'OPTION' && !node.hasAttribute('value')) node.value = node.textContent;
    for (const attribute of ['placeholder', 'aria-label', 'title']) {
      if (!node.hasAttribute?.(attribute)) continue;
      const saved = originalAttributes.get(node) || {};
      const current = node.getAttribute(attribute);
      const source = saved[attribute]?.rendered === current ? saved[attribute].source : current;
      const rendered = t(source);
      saved[attribute] = { source, rendered };
      originalAttributes.set(node, saved);
      if (current !== rendered) node.setAttribute(attribute, rendered);
    }
    for (const child of node.childNodes) translateNode(child);
  }

  function init() {
    const bar = document.createElement('label');
    bar.className = 'language-picker';
    bar.dataset.noI18n = '';
    const select = document.createElement('select');
    for (const [code, name] of Object.entries(languages)) {
      const option = document.createElement('option');
      option.value = code;
      option.textContent = name;
      select.append(option);
    }
    select.value = locale;
    const languageLabels = ['언어', 'Language', '言語', 'Idioma', '语言'];
    const caption = document.createElement('span');
    bar.append(caption, select);
    (document.querySelector('main') || document.body).prepend(bar);
    const apply = () => {
      document.documentElement.lang = locale;
      caption.textContent = languageLabels[locale === 'ko' ? 0 : index() + 1];
      translateNode(document.documentElement);
    };
    select.addEventListener('change', () => {
      locale = select.value;
      try { localStorage.setItem('dashboard:language', locale); } catch {}
      apply();
    });
    apply();
    const observer = new MutationObserver(records => {
      observer.disconnect();
      for (const record of records) {
        if (record.type === 'childList') for (const node of record.addedNodes) translateNode(node);
        else translateNode(record.target);
      }
      observe();
    });
    function observe() {
      observer.observe(document.documentElement, {
        subtree: true, childList: true, characterData: true,
        attributes: true, attributeFilter: ['placeholder', 'aria-label', 'title'],
      });
    }
    observe();
  }
  document.addEventListener('DOMContentLoaded', init);
  return { t, get locale() { return locale; } };
})();
