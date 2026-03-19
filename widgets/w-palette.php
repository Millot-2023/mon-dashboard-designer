<div class="card small" id="palette-card">
    <h3 style="margin:0; text-align: left;">Palette</h3>
    <div class="palette-header" style="display:flex; justify-content:space-between; align-items:center; margin-top:10px; margin-bottom:15px;">
        <div style="display:flex; gap:8px; align-items:center;">
            <div id="custom-select" style="position:relative; width:100px; font-size:0.75rem;">
                <div id="select-trigger" style="background:#1a1a1a; border:1px solid #444; padding:4px 8px; border-radius:4px; cursor:pointer; text-align:center; color:white;">Juicy</div>
                <div id="select-options" style="position:absolute; top:100%; left:0; right:0; background:#1a1a1a; border:1px solid #444; border-radius:4px; margin-top:5px; display:none; z-index:1000; box-shadow: 0 4px 10px rgba(0,0,0,0.5);">
                    <div class="opt" data-value="juicy" style="padding:6px; cursor:pointer; border-bottom:1px solid #333;">Juicy</div>
                    <div class="opt" data-value="cyber" style="padding:6px; cursor:pointer; border-bottom:1px solid #333;">Cyber</div>
                    <div class="opt" data-value="deepsea" style="padding:6px; cursor:pointer; border-bottom:1px solid #333;">Deep Sea</div>
                    <div class="opt" data-value="vintage" style="padding:6px; cursor:pointer;">Vintage</div>
                </div>
            </div>
            <input type="number" id="palette-count" min="2" max="5" value="3" style="background:#1a1a1a; color:white; border:1px solid #444; border-radius:4px; font-size:0.75rem; width:35px; padding:3px; text-align:center;">
        </div>
    </div>
    <div id="palette-colors"></div>
</div>