<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="wp" uri="/aps-core" %>
<s:include value="/WEB-INF/apsadmin/jsp/common/layouts/assets-common.jsp" />
<script type="text/javascript">
	jQuery(function() {
		<s:include value="/WEB-INF/apsadmin/jsp/common/layouts/assets-more/inc/snippet-categoryTree.jsp" />
		<s:include value="/WEB-INF/apsadmin/jsp/common/layouts/assets-more/inc/js_trees_context_menu.jsp" />
	});
</script>
