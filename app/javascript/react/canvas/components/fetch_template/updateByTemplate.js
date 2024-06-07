export const updateByTemplate = async (templateId, nowTitle, setSettingValues) => {
  if(!templateId) return;  //templateIdがnullの場合は何もしない
  try {
    const response = await fetch(`/api/templates/${templateId}`);
    if (response.ok) {
      const templateData = await response.json();
      // console.log('settings:', templateData.graph_setting.settings)
      // console.log('nowTitle:', nowTitle)
      templateData.graph_setting.settings.title = nowTitle; //titleは現在の状態から変更しないため引数で更新
      setSettingValues(templateData.graph_setting.settings);
    } else {
      // console.log('server error!');
    }
  } catch (error) {
    // console.log('failed to fetch', error);
  }
}
