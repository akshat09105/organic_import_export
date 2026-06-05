import mimetypes
import streamlit as st

# Fix Windows MIME type registry issues
mimetypes.add_type('text/html', '.html')
mimetypes.add_type('text/css', '.css')
mimetypes.add_type('application/javascript', '.js')


# Configure the Streamlit page
st.set_page_config(
    page_title="OrganicTrade — Pure Nature, Premium Quality",
    page_icon="🌿",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Custom CSS to hide Streamlit UI elements and make the iframe full-screen
st.markdown("""
    <style>
    /* Hide Streamlit branding and header/footer */
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    header {visibility: hidden;}
    
    /* Remove padding around the main container */
    .block-container {
        padding-top: 0rem !important;
        padding-bottom: 0rem !important;
        padding-left: 0rem !important;
        padding-right: 0rem !important;
    }
    
    /* Ensure the iframe occupies full viewport height and width */
    iframe {
        width: 100vw !important;
        height: 100vh !important;
        border: none !important;
    }
    </style>
""", unsafe_allow_html=True)

# Declare component pointing to the static folder
my_component = st.components.v1.declare_component("my_app", path="static")
my_component()
