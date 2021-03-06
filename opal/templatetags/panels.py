"""
Templatetags for panels
"""
from django import template

from opal.utils import camelcase_to_underscore

register = template.Library()

@register.inclusion_tag('_helpers/record_panel.html')
def record_panel(model):
    """
    Register a panel for our record.
    """
    name = camelcase_to_underscore(model.__class__.__name__)
    title =  getattr(model, '_title',
                     name.replace('_', ' ').title())
    return {
        'name': name,
        'title': title,
        'detail_template': model.__class__.get_detail_template(),
        'icon': getattr(model, '_icon', None)
    }
